import React, { useState } from "react";

import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

//styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

//TODO: choose difficulty
//TODO: choose category
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  //TODO any diff
  const [diffic, setDiffic] = useState("easy");
  const [catego, setCatego] = useState("any");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: string, diffCat: string) => {
    if (diffCat === "diff") {
      console.log(diffic);
      setDiffic(e);
      console.log(diffic);
    } else {
      console.log(catego);
      setCatego(e);
      console.log(catego);
    }
  };

  const startTrivia = async () => {
    //TODO error boundary
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      //TODO some error display
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // user answer
    const answer = e.currentTarget.value;
    // check answer against correct answer
    const correct = questions[questionNumber].correct_answer === answer;
    // add score if answer correct
    if (correct) setScore((prev) => prev + 1);
    // save answer in the user answers array
    const answerObject = {
      question: questions[questionNumber].question,
      answer,
      correct,
      correctAnswer: questions[questionNumber].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    // Move onto the next question if not on the last one already
    const nextQuestion = questionNumber + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  //TODO make into smaller compnents cuz messssy
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        <form onSubmit={handleSubmit}>
          <div className="category">
            <label htmlFor="category-select">Choose a category:</label>
            <select
              value={catego}
              onChange={(e) => handleChange(e.target.value, "catego")}
              name="categories"
              id="category-select"
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="29">Entertainment: Comics</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="30">Science: Gadgets</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="28">Vehicles</option>
              <option value="27">Animals</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
            </select>

            <input type="submit" name="Submit" id="" />
          </div>

          <div className="difficulty">
            <label htmlFor="trivia-difficulty">Choose diffculty</label>
            <select
              value={diffic}
              onChange={(e) => handleChange(e.target.value, "diff")}
              name="difficulties"
              id="trivia-difficulty"
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
              {userAnswers.length === TOTAL_QUESTIONS ? "Restart" : "Start"}
            </button>
          ) : null}
        </form>

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length === questionNumber + 1 &&
        questionNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
