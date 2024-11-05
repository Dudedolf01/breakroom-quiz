import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import generateScore from "../src/generate-score.js";

const logSpy = vi.spyOn(console, "log");

describe("when a valid file is provided", () => {
  beforeEach(() => {
    logSpy.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("produces a score", () => {
    generateScore();
    expect(logSpy).toHaveBeenCalledWith("Test score");
  });
});
