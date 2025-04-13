import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "../Components/QuestionCard";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/data").then((res) => {
        const fetchedQuestions = res.data.questions;
        console.log("Fetched Questions:", fetchedQuestions); // ✅ This logs the array of questions
      setQuestions(fetchedQuestions);
    });
  }, []);

  return (
    <div>
      {questions.length > 0 ? (
        <QuestionCard questions={questions} history={history} setHistory={setHistory} /> 
      ) : (
        <div>Loading questions...</div>
      )}
      
    </div>
  );
};

export default Quiz;
