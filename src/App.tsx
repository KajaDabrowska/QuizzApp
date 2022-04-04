import React, { useState } from "react";
import { Offline } from "react-detect-offline";

import {
  fetchQuizQuestions,
  Difficulty,
  QuestionState,
  ApiOptions,
} from "./API";

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

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [apiOptions, setApiOptions] = useState<ApiOptions>({
    category: "any",
    difficulty: Difficulty.ANY,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTrivia();
  };

  // now it's one step behind kind of
  // it's not a problem cuz it goes well on submit
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(apiOptions);
    setApiOptions((prevOptions) => ({
      ...prevOptions,
      [e.target.id]: e.target.value,
    }));
    // console.log(apiOptions);
  };

  const startTrivia = async () => {
    setErrored(false);
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        apiOptions
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setQuestionNumber(0);
      setLoading(false);
    } catch (err) {
      // console.error(err);

      setErrored(true);
      setLoading(false);
      setGameOver(true);
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

  //TODO make into smaller compnents cuz messssy?
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="card">
          <h1>QUIZZZ!</h1>

          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <form onSubmit={handleSubmit} className="form-opt">
              <div className="category">
                <label htmlFor="category">Choose a category: </label>
                <select
                  onChange={handleChange}
                  name="categories"
                  id="category"
                  className="btn select"
                  autoFocus
                >
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>

                  <optgroup label="Entertainment">
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals &amp; Theatres</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="29">Comics</option>
                    <option value="31">Japanese Anime &amp; Manga</option>
                    <option value="32">Cartoon &amp; Animations</option>
                  </optgroup>

                  <optgroup label="Science">
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    {/*BUG works only without chosen difficulty or with less questions=> <option value="30">Gadgets</option> */}
                  </optgroup>

                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="28">Vehicles</option>
                  <option value="27">Animals</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  {/* <option value="24">Politics</option> */}
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                </select>
              </div>

              <div className="difficulty">
                <label htmlFor="difficulty">Choose diffculty: </label>
                <select
                  onChange={handleChange}
                  name="difficulties"
                  id="difficulty"
                  className="btn select"
                >
                  <option value="any">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {errored ? (
                <p className="error">Error fetching data! 😵 </p>
              ) : null}

              <Offline>
                <p className="error">No internet connection! 😵</p>
              </Offline>

              <button className="btn start " type="submit">
                {userAnswers.length === TOTAL_QUESTIONS || errored
                  ? "Restart"
                  : "Start"}
              </button>
            </form>
          ) : null}

          {!gameOver && !errored ? (
            <p className="score">Score: {score}</p>
          ) : null}

          {score === TOTAL_QUESTIONS ? (
            <p className="congrats">🙌 YOU DID IT! 🙌</p>
          ) : null}

          {loading && <p>Loading Questions...</p>}

          {!loading && !gameOver && !errored ? (
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
          !errored &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTIONS - 1 ? (
            <button autoFocus className="btn next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  );
};

export default App;
