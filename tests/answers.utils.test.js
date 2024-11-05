import { describe, expect, it } from "vitest";
import { parseAnswersAndReturnScore } from "../src/utils/answers.utils.js";

describe("when parsing an answer to generate a score", () => {
  describe.each([
    ["enjoys_job", "yes", 1],
    ["enjoys_job", "no", 0],
    ["enjoys_job", "unsure", 0],
    ["respected_by_managers", "yes", 1],
    ["respected_by_managers", "no", 0],
    ["respected_by_managers", "unsure", 0],
    ["good_for_carers", "yes", 1],
    ["good_for_carers", "no", 0],
    ["good_for_carers", "unsure", 0],
    ["unpaid_extra_work", "yes", 1],
    ["unpaid_extra_work", "no", 0],
    ["unpaid_extra_work", "unsure", 0],
  ])('and %s is "%s"', (field, value, expectedScore) => {
    it(`returns a score of ${expectedScore}`, () => {
      const input = { [field]: value };
      expect(parseAnswersAndReturnScore(input)).toBe(expectedScore);
    });
  });

  describe.only("and they work no more than 8 hours exceeding what they are contracted", () => {
    it("returns a score of 1 if worked overtime", () => {
      const input = {
        contracted_hours: 0,
        hours_actually_worked: 8,
      };
      expect(parseAnswersAndReturnScore(input)).toBe(1);
    });

    it("and they work more than 8 hours exceeding what they are contracted", () => {
      const input = {
        contracted_hours: 1,
        hours_actually_worked: 10,
      };
      expect(parseAnswersAndReturnScore(input)).toBe(0);
    });
  });
});
