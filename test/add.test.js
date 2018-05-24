import { expect } from "chai";
import { add } from "../add";

// Test add function
describe("Test add function", () => {
  it("test case add normal", () => {
    const a = 5;
    const b = 6;
    expect(add(a, b)).to.equal(11);
  });
});
