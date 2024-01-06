import { expect, test, describe } from "vitest";
import { Cost } from "./utils";

describe("extractCost", () => {
  test("bytes", () => {
    expect(new Cost("200 B").bytes).toBe(200);
  });

  test("mega bytes", () => {
    expect(new Cost("5 MB").bytes).toBe(5000000);
  });

  test("validation status", () => {
    expect(new Cost("This query will process 36.48 MB when run.").bytes).toBe(
      36480000
    );
  });
});
