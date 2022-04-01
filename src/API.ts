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
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type ApiOptions = {
  category: string | null;
  difficulty: Difficulty;
};

export const fetchQuizQuestions = async (
  amount: number,
  apiOptions: ApiOptions
) => {
  const { category, difficulty } = apiOptions;

  const endpoint = `https://opentdb.com/api.php?amount=${amount}${
    category ? "&category=" + category : ""
  }&difficulty=${difficulty}&type=multiple`;

  try {
    const data = await (await fetch(endpoint)).json();

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
    // console.error(err);
    throw new Error();
  }
};

//https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple
