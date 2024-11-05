const answersConfig = {
  enjoys_job: (answer) => parseYesNo(answer),
};

const parseYesNo = (answer) => {
  return answer === "yes" ? 1 : 0;
};

export const parseAnswersAndReturnScore = (answers) => {
  return Object.keys(answers).reduce((acc, key) => {
    const answerConfig = answersConfig[key];
    if (answerConfig) {
      acc += answerConfig(answers[key]);
    }
    return acc;
  }, 0);
};
