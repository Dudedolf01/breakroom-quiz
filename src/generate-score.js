import { readJsonFile } from "./utils/file.utils.js";

const generateScore = async () => {
  const filename = process.argv[2];

  if (!filename) {
    console.error("Please provide a filename as an argument");
    // should really be process.exit(1) but that would stop the test suite
    return;
  }

  const answers = await readJsonFile(filename);
  console.log("Answers:", answers);

  console.log("Test score");
};

export default generateScore;
