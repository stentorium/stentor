/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import AWS = require("aws-sdk");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
const secretClient = new AWS.SecretsManager({});

let secretsLoaded = false;

export function setEnv(secretName: string): Promise<void> {
    if (secretsLoaded) {
        log().debug("Secrets were loaded ");
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        secretClient.getSecretValue({ SecretId: secretName }, (err, data) => {
            if (err) {
                log().debug(`Failed to get secrets from  ${secretName}: ${err.message}`);

                log().debug("No secret environment. Trying .env");

                dotenv.config();
                secretsLoaded = true;
                resolve();

                return;
            }

            if (data) {
                log().debug(`Using secrets from ${secretName}`);

                const envConfig = dotenv.parse(data.SecretString);

                Object.keys(envConfig).forEach(key => {
                    process.env[key] = envConfig[key];
                });

                secretsLoaded = true;
            } else {
                log().debug(`There were no environment in ${secretName}`);
            }

            resolve();
        });
    });
}
