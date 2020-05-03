import React, { useState } from "react";
import QuestionPrompt from "./QuestionPrompt";
import ErrorMessage from "./ErrorMessage";
import "./App.css";

function App() {
  const [error, setError] = useState(false);

  return (
    <div>
      {error && <ErrorMessage setError={setError} />}
      <header>
        <h1>Reflection Questions & Journaling Prompts</h1>
        <div className="submit-button">
          <svg className="add-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" className="plus-icon-fill" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <p>
            <a href="https://samanthaandrews.typeform.com/to/XiSc6n" rel="noopener noreferrer" target="_blank">
              Submit a question or prompt
            </a>
          </p>
        </div>
      </header>
      <QuestionPrompt setError={setError} />
      <footer>
        <p>
          Made by{" "}
          <a href="https://samantha-andrews.com/" rel="noopener noreferrer" target="_blank">
            Samantha Andrews
          </a>{" "}
          • This is an open source project,{" "}
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/samanthaandrews/reflection-questions">
            click here
          </a>{" "}
          to contribute
        </p>
      </footer>
    </div>
  );
}

export default App;
