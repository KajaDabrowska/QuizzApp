import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  ANY = "any",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//category: string | null;
export type ApiOptions = {
  category: string;
  difficulty: Difficulty;
};

const getAPIEndpoint = (amount: number, apiOptions: ApiOptions) => {
  const { category, difficulty } = apiOptions;
  // console.log(category, difficulty);

  const endpoint = `https://opentdb.com/api.php?amount=${amount}${
    category !== "any" ? "&category=" + category : ""
  }${difficulty !== "any" ? "&difficulty=" + difficulty : ""}&type=multiple`;
  // console.log(endpoint);

  return endpoint;
};

export const fetchQuizQuestions = async (
  amount: number,
  apiOptions: ApiOptions
) => {
  const endpoint = getAPIEndpoint(amount, apiOptions);

  try {
    const data = await (await fetch(endpoint)).json();
    // console.log(data);

    if (data.response_code === 0) {
      return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    } else throw new Error();
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

//https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple
