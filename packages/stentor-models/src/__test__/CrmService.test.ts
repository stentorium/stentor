/*! Copyright (c) 2025, XAPPmedia */
import { expect } from "chai";
import { AbstractCrmService, CrmServiceAvailabilityOptions, DateTimeRange, ExternalLead } from "../index";

class TestCrmService extends AbstractCrmService {
    // Only implementing required abstract methods for testing
    async send(externalLead: ExternalLead): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getJobType(message: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}

class TestCrmServiceWithAvailability extends AbstractCrmService {
    async send(externalLead: ExternalLead): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getJobType(message: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getAvailability(range: DateTimeRange, options?: CrmServiceAvailabilityOptions) {
        return {
            range,
            unavailabilities: []
        };
    }
}

describe("AbstractCrmService", () => {
    describe("getAvailability", () => {
        it("should throw an error when not implemented by child class", async () => {
            const service = new TestCrmService({});
            const range: DateTimeRange = {
                start: { date: "2025-01-01" },
                end: { date: "2025-01-02" }
            };

            try {
                await service.getAvailability(range);
                expect.fail("Expected getAvailability to throw an error");
            } catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect(error.message).to.include("getAvailability not implemented for TestCrmService");
                expect(error.message).to.include("Services extending AbstractCrmService must implement the getAvailability method");
            }
        });

        it("should not throw an error when properly implemented by child class", async () => {
            const service = new TestCrmServiceWithAvailability({});
            const range: DateTimeRange = {
                start: { date: "2025-01-01" },
                end: { date: "2025-01-02" }
            };

            const result = await service.getAvailability(range);
            
            expect(result).to.deep.equal({
                range,
                unavailabilities: []
            });
        });

        it("should include the service class name in the error message", async () => {
            const service = new TestCrmService({});
            const range: DateTimeRange = {
                start: { date: "2025-01-01" },
                end: { date: "2025-01-02" }
            };

            try {
                await service.getAvailability(range);
                expect.fail("Expected getAvailability to throw an error");
            } catch (error) {
                expect(error.message).to.include("TestCrmService");
            }
        });
    });
});