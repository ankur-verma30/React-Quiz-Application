import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ questions, history, setHistory }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [used, setUsed] = useState([false, false, false, false]);
  const [blanks, setBlanks] = useState(["", "", "", ""]);
  const [blankIndex, setBlankIndex] = useState(0);
  const [timer, setTimer] = useState(30);

  const question = questions[currentIndex];
  const sentenceArray = question.question.split(" ");

  const getBlankPositions = (arr) => {
    return arr
      .map((word, i) => (word === "_____________" ? i : null))
      .filter((val) => val !== null);
  };

  const blankPositions = getBlankPositions(sentenceArray);

  const goToNext = () => {
    const currentQuestion = questions[currentIndex];
    const sentenceArray = currentQuestion.question.split(" ");
    const blankPositions = sentenceArray
      .map((word, i) => (word === "_____________" ? i : null))
      .filter((val) => val !== null);
  
    // Create user sentence
    const userSentenceArray = [...sentenceArray];
    blankPositions.forEach((pos, i) => {
      userSentenceArray[pos] = blanks[i];
    });
    const userSentence = userSentenceArray.join(" ");
  
    // Create correct sentence
    const correctSentenceArray = [...sentenceArray];
    blankPositions.forEach((pos, i) => {
      correctSentenceArray[pos] = currentQuestion.correctAnswer[i];
    });
    const correctSentence = correctSentenceArray.join(" ");
  
    // Check if user's answer matches
    const isCorrect =
      JSON.stringify(blanks) === JSON.stringify(currentQuestion.correctAnswer);
  
    const currentHistory = {
      id: currentQuestion.questionId,
      question: currentQuestion.question,
      userAnswer: blanks,
      correctAnswer: currentQuestion.correctAnswer,
      userSentence,
      correctSentence,
      isCorrect,
    };
  
    setHistory((prev) => [...prev, currentHistory]);
    localStorage.removeItem(`startTime_q${currentIndex}`);
  
    if (currentIndex + 1 >= questions.length) {
      navigate("/results", {
        state: { history: [...history, currentHistory] },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setBlanks(["", "", "", ""]);
      setUsed([false, false, false, false]);
      setBlankIndex(0);
      setTimer(30);
    }
  };
  

  // Persistent timer setup
  useEffect(() => {
    const key = `startTime_q${currentIndex}`;
    const storedStartTime = localStorage.getItem(key);

    if (!storedStartTime) {
      const now = Date.now();
      localStorage.setItem(key, now);
      setTimer(30);
    } else {
      const now = Date.now();
      const elapsed = Math.floor((now - parseInt(storedStartTime)) / 1000);
      const remaining = 30 - elapsed;
      setTimer(remaining > 0 ? remaining : 0);
    }
  }, [currentIndex]);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      goToNext();
    }
  }, [timer]);

  // Fill next blank in serial order
  const handleOptionClick = (word, index) => {
    if (blankIndex >= blankPositions.length) return;

    const updatedBlanks = [...blanks];
    updatedBlanks[blankIndex] = word;

    const updatedUsed = [...used];
    updatedUsed[index] = true;

    setBlanks(updatedBlanks);
    setUsed(updatedUsed);
    setBlankIndex(blankIndex + 1);
  };

  // Allow unselecting a blank
  const handleBlankClick = (i) => {
    const wordToRemove = blanks[i];
    if (!wordToRemove) return;

    const optionIndex = question.options.indexOf(wordToRemove);

    const updatedBlanks = [...blanks];
    const updatedUsed = [...used];

    updatedBlanks[i] = "";
    if (optionIndex !== -1) updatedUsed[optionIndex] = false;

    setBlanks(updatedBlanks);
    setUsed(updatedUsed);
    setBlankIndex(i); // resume filling from this blank
  };

  return (
    <div className="p-6 ">
      {/* Top Bar */}
      <div className="flex justify-between mb-4">
        <div className="text-red-500 font-semibold border border-red-500 rounded-2xl p-4">
          Time Left: {timer}s
        </div>
        <div className="font-semibold text-3xl hover:text-blue-400 border border- rounded-2xl px-2 py-2">Question {currentIndex+1}</div>
        <button
          className="bg-green-600 text-white p-4 font-medium hover:underline rounded-full"
          onClick={() => navigate("/results")}
        >
          Quit
        </button>
      </div>

      {/* Sentence */}
      <div className="text-xl font-semibold mb-12 mt-20">
        {sentenceArray.map((word, index) => {
          const blankPosIndex = blankPositions.indexOf(index);
          if (blankPosIndex !== -1) {
            return (
              <span
                key={index}
                className="inline-block min-w-[120px] border-b-2 mx-1 p-1 cursor-pointer"
                onClick={() => handleBlankClick(blankPosIndex)}
              >
                {blanks[blankPosIndex]}
              </span>
            );
          }
          return (
            <span key={index} className="mx-1">
              {word}
            </span>
          );
        })}
      </div>

      {/* Option Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {question.options.map((opt, i) =>
          used[i] ? null : (
            <button
              key={i}
              className="border rounded-2xl px-4 py-4 bg-white  hover:bg-blue-100 transition"
              onClick={() => handleOptionClick(opt, i)}
            >
              {opt}
            </button>
          )
        )}
      </div>

      {/* Navigation */}
      <div className="text-center">
        <button
          className={`px-6 py-2 rounded text-white ${
            blanks.includes("") && timer > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={blanks.includes("") && timer > 0}
          onClick={goToNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
