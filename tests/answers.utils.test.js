import { describe, expect, it } from "vitest";
import { parseAnswersAndReturnScore } from "../src/utils/answers.utils.js";

describe.only("when parsing an answer to generate a score", () => {
  describe('and enjoys_job is present "', () => {
    describe('and it is a "yes"', () => {
      it("returns a score of 1", () => {
        expect(parseAnswersAndReturnScore({ enjoys_job: "yes" })).toBe(1);
      });
    });

    describe('and it is a "no"', () => {
      it("returns a score of 0", () => {
        expect(parseAnswersAndReturnScore({ enjoys_job: "no" })).toBe(0);
      });
    });
  });
});
