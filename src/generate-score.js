import { parseAnswersAndReturnScore } from "./utils/answers.utils.js";
import { fileExists, readJsonFile } from "./utils/file.utils.js";

const generateScore = async () => {
  const filename = process.argv[2];

  if (!filename) {
    console.error("Please provide a filename as an argument");
    // should throw and error here to be handled by the caller
    return;
  }

  if (!fileExists(filename)) {
    console.error(`File ${filename} does not exist`);
    // should throw and error here to be handled by the caller
    return;
  }

  const answers = await readJsonFile(filename);

  const { score, total } = parseAnswersAndReturnScore(answers);

  console.log(`Scores ${score}/${total}`);
};

export default generateScore;
