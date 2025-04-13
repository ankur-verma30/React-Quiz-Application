import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const Result = () => {
  const { state } = useLocation();
  const history = state?.history || [];
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const score = history.filter((h) => h.isCorrect).length;

  const renderSentence = (question, answers, highlights, type) => {
    const sentenceArray = question.split(" ");
    let blankPointer = 0;

    return (
      <span className="inline-flex flex-wrap gap-1">
        {sentenceArray.map((word, index) => {
          if (word === "_____________") {
            const answerWord = answers[blankPointer];
            const isCorrect =
              highlights && highlights[blankPointer] === answers[blankPointer];
            blankPointer++;

            return (
              <span
                key={index}
                className={`font-semibold underline ${
                  type === "user"
                    ? isCorrect
                      ? "text-green-600"
                      : "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {answerWord}
              </span>
            );
          }

          return <span key={index}>{word}</span>;
        })}
      </span>
    );
  };

  useEffect(() => {
    if (!showDetails && !hasCelebrated && history.length > 0) {
      const duration = 2000;
      const end = Date.now() + duration;

      const confettiInterval = setInterval(() => {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          return;
        }

        confetti({
          particleCount: 50,
          spread: 70,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });
      }, 250);

      setHasCelebrated(true);
    }
  }, [showDetails, hasCelebrated, history]);


  if (!history.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h2 className="text-xl text-red-500 font-semibold text-center">
          No results to show. Please complete the quiz first.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Score Section */}
      {!showDetails && (
        <div className="bg-white p-10 rounded-2xl shadow-md  hover:border-blue-500 transition-all duration-300 ease-in-out w-full max-w-xl text-center mt-24">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Your Score</h1>
        <p className="text-3xl font-semibold text-gray-800 mb-6">{score}/10</p>
        <button
          onClick={() => setShowDetails(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-full transition duration-300">
          Go to Analytics
        </button>
      </div>
      )}

      {/* Results Section */}
      {showDetails && (
        <div className="w-full mt-10 max-w-4xl">
          <h1 className="text-4xl text-center mb-4 underline">Results</h1>
          {history.map((h, index) => (
            <div
              key={index}
              className={`border-2 p-4 mb-4 rounded-lg shadow ${
                h.isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">Question {index + 1}</h2>
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    h.isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {h.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="mt-2">
                <strong>Your Sentence:</strong>{" "}
                {renderSentence(
                  h.question,
                  [...h.userAnswer],
                  h.correctAnswer,
                  "user"
                )}
              </p>

              <p className="mt-2">
                <strong>Correct Sentence:</strong>{" "}
                {renderSentence(h.question, [...h.correctAnswer], null, "correct")}
              </p>
            </div>
          ))}

          {/* Feedback Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/feedback")}
              className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
