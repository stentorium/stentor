## stentor-service-fetch

A simple service meant to be extended to give you a protected this.fetch() method with a timeout.

Timeouts are crucial when designing for conversations, they allow you to communicate back to the user that certain requests are taking longer than expected.

```ts
import { FetchService, TimeoutError } from "../FetchService";

class TestService extends FetchService {
  public getWeatherAlerts(state: string): Promise<any> {
    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    return this.fetch(url).then((response) => {
      return response.json();
    });
  }
}
```
