import React, { useEffect, useState } from "react";
import firestore from "./firebase";
import "./App.css";
import QuestionPrompt from "./Prompts";

function App() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    let arrayOfData = [];
    const collectionsRef = firestore.collection("questions");
    collectionsRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const dataToAdd = {
          ...doc.data(),
          id: doc.id
        };
        arrayOfData.push(dataToAdd);
      });
      const shuffledData = shuffle(arrayOfData);
      setQuestions(shuffledData);
    });
  }, []);

  const handleNextPromptClick = () => {
    if (activeQuestionIndex === questions.length - 1) {
      setActiveQuestionIndex(0);
    } else setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  return (
    <div>
      <header>
        <h1>Reflection Questions & Journaling Prompts</h1>
        <div className="submit-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" className="plus-icon-fill" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <p>
            <a href="google.com">Submit a question or prompt</a>
          </p>
        </div>
      </header>
      <main>
        {questions.length ? (
          <>
            <QuestionPrompt question={questions[activeQuestionIndex]} />
            <button onClick={handleNextPromptClick}>Next prompt</button>
          </>
        ) : (
          <h2>Loading questions...</h2>
        )}
      </main>
      <footer>
        <p>
          Made by <a href="https://samantha-andrews.com/">Samantha Andrews</a> • This is an open source project,{" "}
          <a href="github.com">click here</a> to contribute
        </p>
      </footer>
    </div>
  );
}

export default App;
