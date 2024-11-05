const answersConfig = {
  enjoys_job: (answers) => parseYesPositive(answers, "enjoys_job"),
  respected_by_managers: (answers) =>
    parseYesPositive(answers, "respected_by_managers"),
  good_for_carers: (answers) => parseYesPositive(answers, "good_for_carers"), // should this be carers or careers?
  unpaid_extra_work: (answers) => parseNoPositive(answers, "unpaid_extra_work"),
  worked_overtime: (answers) => workedOvertime(answers),
  paid_minimum_wage: (answers) => paidMinimumWage(answers),
};

const minimumWageRates = {
  over21: 11.44,
  age18to20: 8.6,
  under18: 6.4,
};

const parseYesPositive = (answers, answerKey) => {
  const answer = answers[answerKey];
  return answer === "yes" ? 1 : 0;
};

const parseNoPositive = (answers, answerKey) => {
  const answer = answers[answerKey];
  return answer === "no" ? 1 : 0;
};

const workedOvertime = (answers) => {
  const HOURS_THRESHOLD = 8;
  const contractHours = answers.contracted_hours;
  const actualHours = answers.hours_actually_worked;
  const answer = actualHours - contractHours <= HOURS_THRESHOLD ? 1 : 0;
  return answer;
};

const getMinimumWageForAge = (age) => {
  if (age >= 21) {
    return minimumWageRates.over21;
  } else if (age >= 18) {
    return minimumWageRates.age18to20;
  } else {
    return minimumWageRates.under18;
  }
};

const convertHourlyRateToFloat = (hourlyRate) => {
  return hourlyRate ? parseFloat(hourlyRate.replace("£", "")) : null;
};

const paidMinimumWage = (answers) => {
  const age = answers.age;
  const hourlyRate = convertHourlyRateToFloat(answers.hourly_rate);

  const minimumWage = getMinimumWageForAge(age);
  return hourlyRate >= minimumWage ? 1 : 0;
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
