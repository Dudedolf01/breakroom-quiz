import { describe, expect, it } from "vitest";
import { parseAnswersAndReturnScore } from "../src/utils/answers.utils.js";

describe.only("when parsing an answer to generate a score", () => {
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
});
