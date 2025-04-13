import React, {useEffect,useRef} from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Typed from 'typed.js';

const LandingPage = () => {
  const navigate = useNavigate();
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Sentence Construction'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1500,
      showCursor: true,
      cursorChar: '|',
    });

    return () => typed.destroy();
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      {/* Top Icon and Heading */}
      <div className="mb-8 text-center flex flex-col items-center">
      <img
  src={logo}
  alt="Logo"
  className="w-30 h-30 object-cover rounded-full shadow-md mb-4 flip-on-hover"
/>
      <h1 className="text-3xl font-semibold mb-2">
        <span ref={typedRef}></span>
      </h1>
      <p className="text-gray-500 max-w-xl">
        User has to construct a sentence with random words by placing them in
        the correct order.
      </p>
    </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-4 w-52">
          <h3 className="text-md font-medium text-gray-700 mb-1">
            Time Per Question
          </h3>
          <p className="text-blue-600 font-semibold">30 seconds</p>
        </div>

        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-4 w-52">
          <h3 className="text-md font-medium text-gray-700 mb-1">
            Total Questions
          </h3>
          <p className="text-blue-600 font-semibold">10</p>
        </div>

        <div className="flex flex-col items-center bg-gray-100 rounded-xl p-4 w-52">
          <h3 className="text-md font-medium text-gray-700 mb-1">Coins</h3>
          <div className="flex items-center gap-2 text-yellow-500 font-bold">
            <MonetizationOnIcon />
            20 coins
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="border border-purple-600 text-purple-600 px-6 py-2 rounded-xl hover:bg-purple-100 transition"
          onClick={() => navigate(-1)} // go back
        >
          Back
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
          onClick={() => navigate("/quiz")} // go to quiz
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
