import React, { useState } from "react";

function AIChat({ subscriptions }) {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const askAI = () => {

    const total =
      subscriptions.reduce(
        (sum, sub) =>
          sum + Number(sub.cost),
        0
      );

    if (
      question
        .toLowerCase()
        .includes("monthly")
    ) {

      setAnswer(
        `Your monthly spend is ₹${total}`
      );

    } else if (
      question
        .toLowerCase()
        .includes("expensive")
    ) {

      const max =
        subscriptions.reduce(
          (a,b)=>
            a.cost > b.cost
              ? a
              : b
        );

      setAnswer(
        `${max.service_name}
         is your most expensive
         subscription.`
      );

    } else {

      setAnswer(
        "I couldn't understand that question."
      );

    }
  };

  return (
    <div className="glass-card p-4">

      <h3>
        🤖 AI Assistant
      </h3>

      <input
        className="form-control mt-3"
        placeholder="Ask something..."
        value={question}
        onChange={(e)=>
          setQuestion(
            e.target.value
          )
        }
      />

      <button
        className="btn btn-primary mt-3"
        onClick={askAI}
      >
        Ask AI
      </button>

      {answer && (

        <div
          className="alert alert-info mt-3"
        >
          {answer}
        </div>

      )}

    </div>
  );
}

export default AIChat;