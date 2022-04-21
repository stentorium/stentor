## @xapp/stentor-service-studio

Service for communicating with an OC Studio [Runtime API](https://documentation.xapp.ai/docs/development/api/runtime) for 📣 stentor based applications.

This is used by default within the Assistant builder and relies on environment variables for configuration.

It is also possible to pass an instance to both the Assistant builder methods `withHandlerService()` or `withKnowledgeBaseService()` since it implements both `HandlerService` and `KnowledgeBaseService`.

### Configuration

The StudioService can be configured either through environment variables or by passing in properties to the constructor.

| Environment Variable | Property | Description                                                                                                 |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| STUDIO_BASE_URL      | baseURL  | Defaults to `https://studio.xapp.ai`. Update this to point to another instance of OC Studio                 |
| STUDIO_APP_ID        | appId    | Required, matches the application that the token is associated with                                         |
| STUDIO_TOKEN         | token    | Required, the token used to authenticate the application and give it permission to communicate with the API |

If you want to configure it through the constructor properties, you must pass it to the `withHandlerService()` method. Setting the environment variables do not necessarily require this.

```typescript
const service = new StudioService({ token: "token", appId: "appId" });

const assistant = new Assistant().withHandlerService(service).lambda();
```
