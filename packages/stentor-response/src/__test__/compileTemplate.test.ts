/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";
import { compileTemplate } from "../compileTemplate"; // adjust path as needed

describe("compileTemplate", () => {
  it("should interpolate simple variables", () => {
    const tpl = compileTemplate("Hello, ${name}!");
    const result = tpl({ name: "Alice" });
    expect(result).to.equal("Hello, Alice!");
  });

  it("should access nested properties", () => {
    const tpl = compileTemplate("Your car is a ${user.vehicle.make} ${user.vehicle.model}.");
    const result = tpl({ user: { vehicle: { make: "Toyota", model: "Camry" } } });
    expect(result).to.equal("Your car is a Toyota Camry.");
  });

  it("should handle missing values gracefully", () => {
    const tpl = compileTemplate("Hello, ${user.name}!");
    const result = tpl({}); // user is undefined
    expect(result).to.equal("Hello, ${user.name}!");
  });

  it("should escape backticks in the template string", () => {
    const tpl = compileTemplate("Use the backtick ` symbol safely.");
    const result = tpl({});
    expect(result).to.equal("Use the backtick ` symbol safely.");
  });

  it("should handle invalid template expressions", () => {
    const tpl = compileTemplate("This will break: ${ user..name }");
    const result = tpl({ user: { name: "Bob" } });
    expect(result).to.equal("This will break: ${ user..name }"); // fallback to original string
  });

  it("should interpolate values with dollar signs", () => {
    const tpl = compileTemplate("Total: $${amount}");
    const result = tpl({ amount: "20.00" });
    expect(result).to.equal("Total: $20.00");
  });

  it("should support multiple interpolations", () => {
    const tpl = compileTemplate("${greeting}, ${name}. Today is ${day}.");
    const result = tpl({ greeting: "Hi", name: "Tom", day: "Monday" });
    expect(result).to.equal("Hi, Tom. Today is Monday.");
  });
});
