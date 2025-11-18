/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
const secretClient = new SecretsManagerClient({});

const SECRETS_TTL_MILLIS = 300 * 1000; // 5 minutes
const FUTURE = 9999999999999;
const PAST = 0;

let secretsLoadedMillis = PAST; // Past - age will be ~ 50 years

export async function setEnv(): Promise<void> {
  const secretsAgeMillis = new Date().getTime() - secretsLoadedMillis;

  if (secretsAgeMillis < SECRETS_TTL_MILLIS) {
    return Promise.resolve();
  }

  if (!process.env.STUDIO_SECRET_NAME) {
    log().debug("process.env.STUDIO_SECRET_NAME is not defined. Trying .env");
    dotenv.config();
    secretsLoadedMillis = FUTURE; // Future - age will always be negative
    return;
  }

  try {
    const command = new GetSecretValueCommand({ SecretId: process.env.STUDIO_SECRET_NAME });
    const data = await secretClient.send(command);

    if (data && data.SecretString) {
      log().debug("Using secrets from AWS Secrets Manager");

      const parsed: { [key: string]: string } = JSON.parse(data.SecretString);

      Object.keys(parsed).forEach((key) => {
        process.env[key] = parsed[key];
      });

      secretsLoadedMillis = new Date().getTime();

      log().debug("Secrets were (re-)loaded successfully");
    } else {
      log().debug("No secrets found in AWS Secrets Manager");
    }
  } catch (err: any) {
    log().debug(`Failed to get secrets from AWS Secrets Manager: ${err?.message}`);
    throw err;
  }
}
