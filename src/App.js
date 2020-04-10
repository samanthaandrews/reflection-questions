import React, { useEffect, useState } from "react";
import * as Sentry from "@sentry/browser";
import firestore from "./firebase";
import QuestionPrompt from "./Prompts";
import ErrorMessage from "./ErrorMessage";
import "./App.css";

function App() {
  const DATABASE_LENGTH = 454;
  const generateNewDocID = getRandomInt(0, DATABASE_LENGTH);
  const [question, setQuestion] = useState({});
  const [randomDocId, setRandomDocId] = useState(generateNewDocID);
  const [error, setError] = useState(false);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    const docRef = firestore.collection("questions").doc(`id_${randomDocId}`);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setQuestion(doc.data());
        } else {
          // doc.data() will be undefined in this case
          setError(true);
          console.error("No such document!");
          Sentry.withScope((scope) => {
            scope.setExtras("Firebase error, doc.data() is undefined, no such document!");
          });
        }
      })
      .catch(function (error) {
        setError(true);
        console.error("Error getting document:", error);
        Sentry.withScope((scope) => {
          scope.setExtras(error);
        });
      });
  }, [randomDocId]);

  return (
    <div>
      {error && <ErrorMessage setError={setError} />}
      <header>
        <h1>Reflection Questions & Journaling Prompts</h1>
        <div className="submit-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
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
      <main>
        {question ? (
          <>
            <QuestionPrompt question={question} />
            <button onClick={() => setRandomDocId(generateNewDocID)}>Next prompt</button>
          </>
        ) : (
          <h2>Loading questions...</h2>
        )}
      </main>
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
