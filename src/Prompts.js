import React from "react";
import Anime from "react-anime";
import "./App.css";

function QuestionPrompt({ question }) {
  const { prompt, attribution, link } = question;
  const animeProps = {
    opacity: [0, 1],
    duration: 2000,
    delay: 200,
  };
  return (
    <>
      <Anime {...animeProps}>
        <h2>{prompt}</h2>
        <p>
          This prompt was brought to you by{" "}
          <cite>
            <a href={link} rel="noopener noreferrer" target="_blank">
              {attribution}
            </a>
          </cite>
        </p>
      </Anime>
    </>
  );
}

export default QuestionPrompt;
