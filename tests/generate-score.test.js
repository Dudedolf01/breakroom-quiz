import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import generateScore from "../src/generate-score.js";

const logSpy = vi.spyOn(console, "log");

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
    it("produces a score", () => {
      generateScore();
      expect(logSpy).toHaveBeenCalledWith("Test score");
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

    it('logs filename not provided"', () => {
      generateScore();
      expect(logSpy).toHaveBeenCalledWith("filename", undefined);
    });
  });
});
