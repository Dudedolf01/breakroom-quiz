import { describe, expect, it } from "vitest";
import { parseAnswersAndReturnScore } from "../src/utils/answers.utils.js";

describe("when parsing an answer to generate a score and total", () => {
  describe.each([
    ["enjoys_job", "yes", 1, 1],
    ["enjoys_job", "no", 0, 1],
    ["enjoys_job", "unsure", 0, 0],
    ["respected_by_managers", "yes", 1, 1],
    ["respected_by_managers", "no", 0, 1],
    ["respected_by_managers", "unsure", 0, 0],
    ["good_for_carers", "yes", 1, 1],
    ["good_for_carers", "no", 0, 1],
    ["good_for_carers", "unsure", 0, 0],
    ["unpaid_extra_work", "yes", 0, 1],
    ["unpaid_extra_work", "no", 1, 1],
    ["unpaid_extra_work", "unsure", 0, 0],
  ])('and %s is "%s"', (field, value, score, total) => {
    it(`returns a score of ${score} and total of ${total}`, () => {
      const input = { [field]: value };
      expect(parseAnswersAndReturnScore(input)).toEqual({ score, total });
    });
  });

  describe("and they work no more than 8 hours exceeding what they are contracted", () => {
    it("returns a score of 1 and total of 1", () => {
      const input = {
        contracted_hours: 0,
        hours_actually_worked: 8,
      };
      expect(parseAnswersAndReturnScore(input)).toEqual({ score: 1, total: 1 });
    });
  });

  describe("and they work more than 8 hours exceeding what they are contracted", () => {
    it("returns a score of 0", () => {
      const input = {
        contracted_hours: 1,
        hours_actually_worked: 10,
      };
      expect(parseAnswersAndReturnScore(input)).toEqual({ score: 0, total: 1 });
    });
  });

  // Should do more tests for the minimum wage for the different ages
  describe("and they are paid the minimum wage", () => {
    it("returns a score of 1", () => {
      const input = {
        age: 22,
        hourly_rate: "£12.4",
      };
      expect(parseAnswersAndReturnScore(input)).toEqual({ score: 1, total: 1 });
    });
  });

  describe("and they are not paid the minimum wage", () => {
    it("returns a score of 1", () => {
      const input = {
        age: 22,
        hourly_rate: "£5.5",
      };
      expect(parseAnswersAndReturnScore(input)).toEqual({ score: 0, total: 1 });
    });
  });
});
