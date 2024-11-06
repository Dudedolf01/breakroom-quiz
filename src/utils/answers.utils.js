/**
 * Configuration object for parsing answers to various survey questions.
 * Each key represents a question, with a function that processes the answer and returns a score.
 * This is hopefully an extensible way to add more questions in the future.
 */
const answersConfig = {
  enjoys_job: (answers) => parseYesPositive(answers, "enjoys_job"),
  respected_by_managers: (answers) =>
    parseYesPositive(answers, "respected_by_managers"),
  good_for_carers: (answers) => parseYesPositive(answers, "good_for_carers"), // should this be carers or careers?
  unpaid_extra_work: (answers) => parseNoPositive(answers, "unpaid_extra_work"),
  worked_overtime: (answers) => workedOvertime(answers),
  paid_minimum_wage: (answers) => paidMinimumWage(answers),
};

/**
 * Minimum wage rates based on age group.
 */
const minimumWageRates = {
  over21: 11.44,
  age18to20: 8.6,
  under18: 6.4,
};

/**
 * Parses an answer as positive if the response is "yes".
 * @param {Object} answers - The answers object.
 * @param {string} answerKey - The key of the answer to evaluate.
 * @returns {number[]} - Array where the first element is score and second is total increment.
 */
const parseYesPositive = (answers, answerKey) => {
  const answer = answers[answerKey];
  if (answer === "yes") {
    return [1, 1];
  } else if (answer === "no") {
    return [0, 1];
  } else {
    return [0, 0];
  }
};

/**
 * Parses an answer as positive if the response is "no".
 * @param {Object} answers - The answers object.
 * @param {string} answerKey - The key of the answer to evaluate.
 * @returns {number[]} - Array where the first element is score and second is total increment.
 */
const parseNoPositive = (answers, answerKey) => {
  const answer = answers[answerKey];
  if (answer === "yes") {
    return [0, 1];
  } else if (answer === "no") {
    return [1, 1];
  } else {
    return [0, 0];
  }
};

/**
 * Determines if the respondent worked overtime based on contracted and actual hours.
 * @param {Object} answers - The answers object containing hours worked.
 * @returns {number[]} - Array where the first element is score and second is total increment.
 */
const workedOvertime = (answers) => {
  const HOURS_THRESHOLD = 8;
  const contractHours = answers.contracted_hours;
  const actualHours = answers.hours_actually_worked;

  // using == to check for null or undefined
  if (contractHours == null || actualHours == null) {
    return [0, 0];
  }

  const answer = actualHours - contractHours <= HOURS_THRESHOLD ? 1 : 0;
  return [answer, 1];
};

/**
 * Retrieves the minimum wage rate based on the respondent's age.
 * @param {number} age - Age of the respondent.
 * @returns {number} - The minimum wage for the given age group.
 */
const getMinimumWageForAge = (age) => {
  if (age >= 21) {
    return minimumWageRates.over21;
  } else if (age >= 18) {
    return minimumWageRates.age18to20;
  } else {
    return minimumWageRates.under18;
  }
};

/**
 * Converts a string hourly rate to a float, removing the currency symbol.
 * @param {string} hourlyRate - Hourly rate as a string with currency symbol.
 * @returns {number|null} - The numeric hourly rate or null if invalid.
 */
const convertHourlyRateToFloat = (hourlyRate) => {
  return hourlyRate ? parseFloat(hourlyRate.replace("£", "")) : null;
};

/**
 * Determines if the respondent was paid at least the minimum wage.
 * @param {Object} answers - The answers object with age and hourly rate.
 * @returns {number[]} - Array where the first element is score and second is total increment.
 */
const paidMinimumWage = (answers) => {
  const age = answers.age;
  const hourlyRate = convertHourlyRateToFloat(answers.hourly_rate);

  // using == to check for null or undefined
  if (hourlyRate == null || age == null) {
    return [0, 0];
  }

  const minimumWage = getMinimumWageForAge(age);
  return hourlyRate >= minimumWage ? [1, 1] : [0, 1];
};

/**
 * Parses all answers and returns the total score and total possible points. Based on the answersConfig object
 * which contains functions to parse each answer.
 * @param {Object} answers - The answers object with responses to survey questions.
 * @returns {Object} - Object with total score and total possible points.
 */
export const parseAnswersAndReturnScore = (answers) => {
  return Object.keys(answersConfig).reduce(
    (acc, key) => {
      const answerConfig = answersConfig[key];
      if (answerConfig) {
        const [score, addToTotal] = answerConfig(answers);
        acc.score += score;
        acc.total += addToTotal;
      }
      return acc;
    },
    { score: 0, total: 0 }
  );
};
