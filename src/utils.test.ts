import { expect, test } from "vitest";
import { extractCost } from "./utils";

test("", () => {
  expect(extractCost("5")).toBe(5);
});
