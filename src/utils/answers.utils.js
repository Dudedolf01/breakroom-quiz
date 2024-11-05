const answersConfig = {
  enjoys_job: (answers) => parseYesNo(answers, "enjoys_job"),
  respected_by_managers: (answers) =>
    parseYesNo(answers, "respected_by_managers"),
  good_for_carers: (answers) => parseYesNo(answers, "good_for_carers"), // should this be carers or careers?
  unpaid_extra_work: (answers) => parseYesNo(answers, "unpaid_extra_work"),
  worked_overtime: (answers) => worked_overtime(answers),
};

const parseYesNo = (answers, answerKey) => {
  const answer = answers[answerKey];
  return answer === "yes" ? 1 : 0;
};

const worked_overtime = (answers) => {
  const HOURS_THRESHOLD = 8;
  const contractHours = answers.contracted_hours;
  const actualHours = answers.hours_actually_worked;
  const answer = actualHours - contractHours <= HOURS_THRESHOLD ? 1 : 0;
  return answer;
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
