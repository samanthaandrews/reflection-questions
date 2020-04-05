import React from "react";
import "./App.css";

function QuestionPrompt({ question }) {
  const { prompt, attribution, link } = question;
  return (
    <>
      <h2>{prompt}</h2>
      <p>
        Brought to you by{" "}
        <cite>
          <a href={link}>{attribution}</a>
        </cite>
      </p>
    </>
  );
}

export default QuestionPrompt;
