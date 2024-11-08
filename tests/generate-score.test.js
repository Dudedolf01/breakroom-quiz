import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { readFile } from "fs/promises";

import generateScore from "../src/generate-score.js";

vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
}));

const logSpy = vi.spyOn(console, "log");
const errorSpy = vi.spyOn(console, "error");

const mockJsonData = JSON.stringify({
  enjoys_job: "yes",
  respected_by_managers: "no",
  good_for_carers: "yes",
  contracted_hours: 20,
  hours_actually_worked: 34,
  unpaid_extra_work: "unsure",
  age: 26,
  hourly_rate: "£8.72",
  submitted_date: 1608211454000,
});

// mocking readfile so we have no side effects in our tests
readFile.mockResolvedValue(mockJsonData);

describe("when generating a score", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    logSpy.mockClear();
    process.argv = ["node", "index.js", "mock-answer-file.json"];
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe("and a valid file is provided", () => {
    it("produces a score", async () => {
      await generateScore();
      expect(logSpy).toHaveBeenCalledWith("Scores 2/5");
    });
  });

  describe("and a file is not provided", () => {
    const originalExit = process.exit;

    beforeEach(() => {
      process.argv = ["node", "index.js"];
      process.exit = vi.fn();
    });

    afterEach(() => {
      process.exit = originalExit;
    });

    it('logs filename not provided"', async () => {
      await generateScore();
      expect(errorSpy).toHaveBeenCalledWith(
        "Please provide a filename as an argument"
      );
    });
  });
});
