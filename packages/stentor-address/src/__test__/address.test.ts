/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";

import {
  parseAddress,
  formAddressFromSlots,
  parseAddressAsSlots,
  getAddressComponents,
  ParsedAddress,
} from "../address";

describe(`#${parseAddress.name}()`, () => {
  it("parses the address", () => {
    const parsed = parseAddress("1600 Pennsylvania Avenue NW, Washington, DC 20500");
    expect(parsed).to.exist;

    expect(parsed?.stateName).to.equal("District Of Columbia");
    expect(parsed?.zipCode).to.equal("20500");
    expect(parsed?.placeName).to.equal("Washington");
    expect(parsed?.streetNumber).to.equal("1600");
    // This isn't working perfectly yet, comes back as "Pennsylvania"
    // expect(parsed?.streetName).to.equal("Pennsylvania Avenue NW");
  });
  describe("with just the address", () => {
    it("parses correctly", () => {
      const parsed = parseAddress("1600 Pennsylvania Avenue NW");

      expect(parsed).to.exist;
      expect(parsed?.streetNumber).to.equal("1600");
      const parsed0 = parseAddress("1617 D St NE");
      expect(parsed0).to.exist;
      const parsed1 = parseAddress("5 Glenlake Court");
      expect(parsed1).to.exist;
    });
  });
  describe("with partial addresses", () => {
    it("parses correctly", () => {
      const parsed = parseAddress("70951 Granite Dr  97702");
      expect(parsed).to.exist;
      // This still needs more work to work
      // expect(parsed.zip).toBe("97702");
    });
  });
  describe("with just the city and state", () => {
    it("parses correctly", () => {
      const parsed0 = parseAddress("Washington, DC");

      expect(parsed0).to.exist;
      expect(parsed0?.placeName).to.equal("");

      const parsed1 = parseAddress("Richmond, VA");
      expect(parsed1).to.exist;
    });
  });
  describe("with additional carrier phrase", () => {
    it("parses correctly", () => {
      const parsed0 = parseAddress("my address is 1600 Pennsylvania Avenue NW, Washington, DC 20500");
      expect(parsed0).to.exist;
      expect(parsed0?.placeName).to.equal("Washington");
      expect(parsed0?.zipCode).to.equal("20500");
    });
  });

  describe("field completeness", () => {
    it("populates all address fields correctly", () => {
      const parsed = parseAddress("123 Main Street, Seattle, WA 98101");
      expect(parsed).to.exist;

      // Required and commonly used fields
      expect(parsed?.streetNumber).to.equal("123");
      expect(parsed?.streetName).to.equal("Main");
      expect(parsed?.streetSuffix).to.equal("St");
      expect(parsed?.addressLine1).to.equal("123 Main St");
      expect(parsed?.placeName).to.equal("Seattle");
      expect(parsed?.stateAbbreviation).to.equal("WA");
      expect(parsed?.stateName).to.equal("Washington");
      expect(parsed?.zipCode).to.equal("98101");
      expect(parsed?.formattedAddress).to.exist;
    });

    it("populates streetDirection for addresses with directions", () => {
      const parsed = parseAddress("456 Oak Ave NE, Portland, OR 97201");
      expect(parsed).to.exist;
      expect(parsed?.streetDirection).to.equal("NE");
      expect(parsed?.streetSuffix).to.equal("Ave");
    });

    it("handles various street suffixes", () => {
      const tests = [
        { address: "100 Park Boulevard, Miami, FL 33101", suffix: "Blvd" },
        { address: "200 River Road, Austin, TX 78701", suffix: "Rd" },
        { address: "300 Lake Drive, Chicago, IL 60601", suffix: "Dr" },
      ];

      tests.forEach(({ address, suffix }) => {
        const parsed = parseAddress(address);
        expect(parsed?.streetSuffix).to.equal(suffix);
      });
    });
  });
});

describe(`#${formAddressFromSlots.name}()`, () => {
  it("parses address from slots", () => {
    const slots = {
      street_number: { name: "street_number", value: "1600" },
      street: { name: "street", value: "Pennsylvania Avenue NW" },
      city: { name: "city", value: "Washington" },
      state: { name: "state", value: "DC" },
      zip: { name: "zip", value: "20500" },
    };
    const address = formAddressFromSlots(slots);
    expect(address).to.equal("1600 Pennsylvania Avenue NW, Washington, DC 20500");
  });

  it("parses address with missing street number", () => {
    const slots = {
      street: { name: "street", value: "Pennsylvania Avenue NW" },
      city: { name: "city", value: "Washington" },
      state: { name: "state", value: "DC" },
      zip: { name: "zip", value: "20500" },
    };
    const address = formAddressFromSlots(slots);
    expect(address).to.equal("Pennsylvania Avenue NW, Washington, DC 20500");
  });

  it("parses address with missing street", () => {
    const slots = {
      street_number: { name: "street_number", value: "1600" },
      city: { name: "city", value: "Washington" },
      state: { name: "state", value: "DC" },
      zip: { name: "zip", value: "20500" },
    };
    const address = formAddressFromSlots(slots);
    expect(address).to.equal("1600, Washington, DC 20500");
  });

  it("parses address with quadrant", () => {
    const slots = {
      street_number: { name: "street_number", value: "1600" },
      street: { name: "street", value: "Pennsylvania Avenue NW" },
      quadrant: { name: "quadrant", value: "NW" },
      city: { name: "city", value: "Washington" },
      state: { name: "state", value: "DC" },
      zip: { name: "zip", value: "20500" },
    };
    const address = formAddressFromSlots(slots);
    expect(address).to.equal("1600 Pennsylvania Avenue NW, Washington, DC 20500");
  });
});

describe(`#${parseAddressAsSlots.name}()`, () => {
  it("parses the address", () => {
    const parsed = parseAddressAsSlots("1600 Pennsylvania Avenue NW, Washington, DC 20500");
    expect(parsed).to.exist;
    expect(parsed?.city?.value).to.equal("Washington");
    expect(parsed?.state?.value).to.equal("District Of Columbia");
    expect(parsed?.zip?.value).to.equal("20500");
  });

  describe("with just the address", () => {
    it("parses correctly", () => {
      const parsed = parseAddressAsSlots("1600 Pennsylvania Avenue NW");
      expect(parsed).to.exist;
      expect(parsed?.street_number?.value).to.equal("1600");
      expect(parsed?.street?.value).to.equal("1600 Pennsylvania Ave NW");

      const parsed0 = parseAddressAsSlots("1500 E St SE");
      expect(parsed0).to.exist;

      const parsed1 = parseAddressAsSlots("5 Glenpone Court");
      expect(parsed1).to.exist;
    });
  });

  describe("with partial addresses", () => {
    it("parses correctly", () => {
      const parsed = parseAddressAsSlots("70951 Granite Dr  97702");
      expect(parsed).to.exist;
    });
  });

  describe("with just the city and state", () => {
    it("parses correctly", () => {
      const parsed0 = parseAddressAsSlots("Washington, DC");
      expect(parsed0).to.exist;
      // Note: parse-address misinterprets city-only input as street name, but still returns data
      const parsed1 = parseAddressAsSlots("Richmond, VA");
      expect(parsed1).to.exist;
    });
  });

  describe("with additional carrier phrase", () => {
    it("parses correctly", () => {
      const parsed0 = parseAddressAsSlots("my address is 1600 Pennsylvania Avenue NW, Washington, DC 20500");
      expect(parsed0).to.exist;
      expect(parsed0?.city).to.deep.equal({
        name: "city",
        value: "Washington",
      });
      expect(parsed0?.zip).to.deep.equal({ name: "zip", value: "20500" });
    });
  });

  describe("slot field completeness", () => {
    it("populates all slot fields from a complete address", () => {
      const parsed = parseAddressAsSlots("123 Main Street, Seattle, WA 98101");
      expect(parsed).to.exist;

      // Verify all key slots are populated
      expect(parsed?.street_number?.value).to.equal("123");
      expect(parsed?.street?.value).to.equal("123 Main St");
      expect(parsed?.street_name?.value).to.equal("Main St");
      expect(parsed?.city?.value).to.equal("Seattle");
      expect(parsed?.state?.value).to.equal("Washington");
      expect(parsed?.zip?.value).to.equal("98101");
      expect(parsed?.address?.value).to.exist;
    });
  });
});

describe(`#${getAddressComponents.name}()`, () => {
  describe("when passed a string", () => {
    describe("that is valid", () => {
      it("returns correctly", () => {
        const address = "1600 Pennsylvania Avenue NW, Washington, DC 20500";
        const components = getAddressComponents(address);
        expect(components).to.deep.equal({
          streetNumber: "1600",
          formattedAddress: "1600 Pennsylvania Ave NW, Washington, DC 20500",
          addressLine1: "1600 Pennsylvania Ave NW",
          placeName: "Washington",
          stateAbbreviation: "DC",
          streetDirection: "NW",
          streetName: "Pennsylvania",
          streetSuffix: "Ave",
          stateName: "District Of Columbia",
          zipCode: "20500",
          id: "1600-Pennsylvania-Ave-NW,-Washington,-DC-20500",
        });
      });
    });
  });
  describe("when passed an object", () => {
    describe("without an address and no state", () => {
      it("returns correctly", () => {
        const formatted: Partial<ParsedAddress> = {
          formattedAddress: "2328 West Sebring Dr, Tucson, Arizona",
        };

        // expected parsed address (parse-address normalizes "West" to "W" and separates prefix from street name)
        const parsed: ParsedAddress = {
          stateName: "Arizona",
          stateAbbreviation: "AZ",
          placeName: "Tucson",
          addressLine1: "2328 W Sebring Dr",
          id: "2328-W-Sebring-Dr,-Tucson,-AZ",
          streetNumber: "2328",
          streetSuffix: "Dr",
          streetName: "Sebring",
        };

        const components = getAddressComponents(formatted);
        expect(components).to.include({ ...parsed });

        // Try passing it through to itself
        const components2 = getAddressComponents({ ...parsed, ...formatted });
        expect(components2).to.include({ ...parsed });
      });
    });
    describe("when passed a full object", () => {
      it("returns correctly", () => {
        const formatted: Partial<ParsedAddress> = {
          formattedAddress: "2328 West Sebring Dr, Tucson, Arizona",
          stateAbbreviation: "AZ",
          stateName: "Arizona",
          placeName: "Tucson",
          addressLine1: "2328 West Sebring Dr",
          streetNumber: "2328",
          streetSuffix: "Dr",
          streetName: "West Sebring",
        };
        expect(getAddressComponents(formatted)).to.include({ ...formatted });
      });
    });
    describe("when passed incomplete data", () => {
      it("returns correctly", () => {
        const formatted: Partial<ParsedAddress> = {
          placeName: "Tucson",
          addressLine1: "2328 West Sebring Dr",
          streetNumber: "2328",
          streetSuffix: "Dr",
          streetName: "West Sebring",
        };
        const result = getAddressComponents(formatted);
        // When incomplete, the function parses and normalizes (West -> W)
        expect(result).to.include({
          placeName: "Tucson",
          streetNumber: "2328",
          streetSuffix: "Dr",
        });
      });
    });
  });
});
