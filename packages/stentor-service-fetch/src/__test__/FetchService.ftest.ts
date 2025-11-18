/*! Copyright (c) 2022, XAPPmedia */
import * as chai from "chai";
import { FetchService, TimeoutError } from "../FetchService";

const expect = chai.expect;
chai.use(require('chai-as-promised'))

class TestService extends FetchService {
    public getWeatherAlerts(state: string): Promise<any> {

        const url = `https://api.weather.gov/alerts/active?area=${state}`;

        return this.fetch(url).then((response) => {
            return response.json();
        });
    }
}

describe(`FetchService`, () => {
    it("returns responses", async () => {
        const service = new TestService({ timeout: 500, logs: true });
        const result = await service.getWeatherAlerts("MD");
        // eslint-disable-next-line no-console
        console.log(`${result.title}`);
        expect(result).to.exist;
    });
    describe("for a slow response", () => {
        it("times out", async () => {

            const service = new TestService({ timeout: 10, logs: true });

            await expect(service.getWeatherAlerts("MD")).to.be.rejectedWith(TimeoutError);

        });
    });
});