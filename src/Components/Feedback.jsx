import React from "react";

const Feedback = () => {
  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <textarea
        rows="5"
        placeholder="Your feedback here..."
        className="w-full p-3 border rounded"
      ></textarea>
      <br />
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
