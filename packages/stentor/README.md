## stentor

### Supported Environment Variables

| Variable           | Description                                                                                 | Value                         |
| ------------------ | ------------------------------------------------------------------------------------------- | ----------------------------- |
| STUDIO_APP_ID      | Unique identification for the application                                                   | String, "app-id"              |
| STUDIO_BASE_URL    | Defaults to `https://studio.xapp.ai`. Update this to point to another instance of OC Studio | String, "https://api.xapp.ai" |
| STUDIO_SECRET_NAME | Name of the secret within AWS Secrets Manager to retreive runtime configuration             | String                        |
| STUDIO_MAX_HISTORY | Maximum amount of history to keep for transcript and request history on storage.            | Number, defaults to 20        |

_Deprecated Variables_

STUDIO_TOKEN, OVAI_TOKEN, OVAI_APP_ID
