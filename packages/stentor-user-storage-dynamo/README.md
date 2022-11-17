## stentor-user-storage-dynamo

User storage for 📣 stentor using AWS DynamoDB

Supported environment variables:

```
STUDIO_APP_ID=
USER_STORAGE_TABLE=
```

### Saving to Long Term Storage

If you want to append additional items to the long term storage for use beyond the current session, you can define the new information you want to save on the storage with a schema.
