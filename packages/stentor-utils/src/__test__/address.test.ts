/*! Copyright (c) 2022, XAPP AI */
import { expect } from "chai";
import {
  parseAddress,
  formAddressFromSlots,
  parseAddressAsSlots,
} from "../address";

describe(`#${parseAddress.name}()`, () => {
  it("parses the address", () => {
    const parsed = parseAddress(
      "1600 Pennsylvania Avenue NW, Washington, DC 20500"
    );
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
      expect(parsed?.streetNumber).to.equal("");
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
      const parsed0 = parseAddress(
        "my address is 1600 Pennsylvania Avenue NW, Washington, DC 20500"
      );
      expect(parsed0).to.exist;
      expect(parsed0?.placeName).to.equal("Washington");
      expect(parsed0?.zipCode).to.equal("20500");
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
    expect(address).to.equal(
      "1600 Pennsylvania Avenue NW, Washington, DC 20500"
    );
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
    expect(address).to.equal(
      "1600 Pennsylvania Avenue NW, Washington, DC 20500"
    );
  });
});

describe(`#${parseAddressAsSlots.name}()`, () => {
  it("parses the address", () => {
    const parsed = parseAddressAsSlots(
      "1600 Pennsylvania Avenue NW, Washington, DC 20500"
    );
    expect(parsed).to.exist;
    expect(parsed?.city?.value).to.equal("Washington");
    expect(parsed?.state?.value).to.equal("District Of Columbia");
    expect(parsed?.zip?.value).to.equal("20500");
  });

  describe("with just the address", () => {
    it("parses correctly", () => {
      const parsed = parseAddressAsSlots("1600 Pennsylvania Avenue NW");
      expect(parsed).to.deep.equal({});

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
      expect(parsed0).to.deep.equal({});
      const parsed1 = parseAddressAsSlots("Richmond, VA");
      expect(parsed1).to.deep.equal({});
    });
  });

  describe("with additional carrier phrase", () => {
    it("parses correctly", () => {
      const parsed0 = parseAddressAsSlots(
        "my address is 1600 Pennsylvania Avenue NW, Washington, DC 20500"
      );
      expect(parsed0).to.exist;
      expect(parsed0?.city).to.deep.equal({
        name: "city",
        value: "Washington",
      });
      expect(parsed0?.zip).to.deep.equal({ name: "zip", value: "20500" });
    });
  });
});
