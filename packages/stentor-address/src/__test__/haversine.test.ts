/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";

import { haversineDistanceKm, haversineDistanceMiles } from "../haversine";

describe("haversineDistanceKm", () => {
  it("should return 0 when coordinates are identical", () => {
    const dist = haversineDistanceKm({ lat: 0, lon: 0 }, { lat: 0, lon: 0 });
    expect(dist).to.be.closeTo(0, 0.0001);
  });

  it("should return a positive distance between two points", () => {
    const dist = haversineDistanceKm(
      { lat: 38.89461334860777, lon: -76.98158015103675 },
      { lat: 43.18228334056096, lon: -77.65874089930519 }
    );
    expect(dist).to.be.greaterThan(0);
    // Check approximate value
    expect(dist).to.be.closeTo(480, 1); // approx distance between DC and Rochester, NY in km
  });
});

describe("haversineDistanceMiles", () => {
  it("should return 0 when coordinates are identical", () => {
    const dist = haversineDistanceMiles({ lat: 0, lon: 0 }, { lat: 0, lon: 0 });
    expect(dist).to.be.closeTo(0, 0.0001);
  });

  it("should return a positive distance between two points in miles", () => {
    const dist = haversineDistanceMiles(
      { lat: 38.89461334860777, lon: -76.98158015103675 },
      { lat: 43.18228334056096, lon: -77.65874089930519 }
    );
    expect(dist).to.be.greaterThan(0);
    // Check approximate value in miles
    expect(dist).to.be.closeTo(299, 1); // approx distance in miles
  });
});
