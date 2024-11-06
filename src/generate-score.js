import { parseAnswersAndReturnScore } from "./utils/answers.utils.js";
import { readJsonFile } from "./utils/file.utils.js";

const generateScore = async () => {
  const filename = process.argv[2];

  if (!filename) {
    console.error("Please provide a filename as an argument");
    // should really be process.exit(1) but that would stop the test suite
    // so using return for now
    return;
  }

  const answers = await readJsonFile(filename);
  const { score, total } = parseAnswersAndReturnScore(answers);

  console.log(`Scores ${score}/${total}`);
};

export default generateScore;
