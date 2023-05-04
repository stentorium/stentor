/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import AWS = require("aws-sdk");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
const secretClient = new AWS.SecretsManager({});

const SECRETS_TTL_MILLIS = 300 * 1000; // 5 minutes
const FUTURE = 9999999999999;
const PAST = 0;

let secretsLoadedMillis = PAST; // Past - age will be ~ 50 years

export function setEnv(): Promise<void> {
    const secretsAgeMillis = new Date().getTime() - secretsLoadedMillis;

    if (secretsAgeMillis < SECRETS_TTL_MILLIS) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        if (!process.env.STUDIO_SECRET_NAME) {
            log().debug("process.env.STUDIO_SECRET_NAME is not defined. Trying .env");
            dotenv.config();
            secretsLoadedMillis = FUTURE; // Future - age will always be negative
            resolve();
            return;
        }

        secretClient.getSecretValue({ SecretId: process.env.STUDIO_SECRET_NAME }, (err, data) => {
            if (err) {
                log().debug(`Failed to get secrets from  ${process.env.STUDIO_SECRET_NAME}: ${err.message}`);
                reject(err);
                return;
            }

            if (data && data.SecretString) {
                log().debug(`Using secrets from ${process.env.STUDIO_SECRET_NAME}`);

                const parsed: { [key: string]: string } = JSON.parse(data.SecretString);

                Object.keys(parsed).forEach((key) => {
                    process.env[key] = parsed[key];
                });

                secretsLoadedMillis = new Date().getTime();

                log().debug(`Secrets were (re-)loaded. Secrets version (STUDIO_SECRET_VERSION): ${process.env.STUDIO_SECRET_VERSION}`);
            } else {
                log().debug(`There were no secrets in ${process.env.STUDIO_SECRET_NAME}`);
            }

            resolve();
        });
    });
}
