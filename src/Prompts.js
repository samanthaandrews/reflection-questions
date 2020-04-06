import React from "react";
import "./App.css";

function QuestionPrompt({ question }) {
  const { prompt, attribution, link } = question;
  return (
    <>
      <h2>{prompt}</h2>
      <p>
        This prompt was brought to you by{" "}
        <cite>
          <a href={link} rel="noopener noreferrer" target="_blank">
            {attribution}
          </a>
        </cite>
      </p>
    </>
  );
}

export default QuestionPrompt;
