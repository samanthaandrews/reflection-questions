import React, { useEffect, useState } from "react";
import * as Sentry from "@sentry/browser";
import firestore from "./firebase";
import Anime from "react-anime";
import "./App.css";

function QuestionPrompt({ setError }) {
  const DATABASE_LENGTH = 454;
  const generateNewDocID = getRandomInt(0, DATABASE_LENGTH);
  const [question, setQuestion] = useState({});
  const [randomDocId, setRandomDocId] = useState(generateNewDocID);

  const animeProps = {
    opacity: [0, 1],
    duration: 2000,
    delay: 200,
  };

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
    <main>
      {question ? (
        <>
          <Anime {...animeProps}>
            <h2>{question.prompt}</h2>
            {question.attribution && (
              <p>
                This prompt was brought to you by{" "}
                <cite>
                  <a href={question.link} rel="noopener noreferrer" target="_blank">
                    {question.attribution}
                  </a>
                </cite>
              </p>
            )}
          </Anime>
          <button onClick={() => setRandomDocId(generateNewDocID)}>Next prompt</button>
        </>
      ) : (
        <h2>Loading questions...</h2>
      )}
    </main>
  );
}

export default QuestionPrompt;
