const answersConfig = {
  enjoys_job: (answers) => parseYesNo(answers, "enjoys_job"),
  respected_by_managers: (answers) =>
    parseYesNo(answers, "respected_by_managers"),
  good_for_carers: (answers) => parseYesNo(answers, "good_for_carers"), // should this be carers or careers?
  unpaid_extra_work: (answers) => parseYesNo(answers, "unpaid_extra_work"),
};

const parseYesNo = (answers, answerKey) => {
  const answer = answers[answerKey];
  return answer === "yes" ? 1 : 0;
};

export const parseAnswersAndReturnScore = (answers) => {
  return Object.keys(answersConfig).reduce((acc, key) => {
    const answerConfig = answersConfig[key];
    if (answerConfig) {
      acc += answerConfig(answers);
    }
    return acc;
  }, 0);
};
