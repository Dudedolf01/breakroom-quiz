const answersConfig = {
  enjoys_job: (answer) => parseYesNo(answer),
  respected_by_managers: (answer) => parseYesNo(answer),
  good_for_carers: (answer) => parseYesNo(answer), // should this be carers or careers?
  unpaid_extra_work: (answer) => parseYesNo(answer),
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
