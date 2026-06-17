import React, {
  useState
} from "react";

import api from "../api/axios";

import {
  useNavigate
} from "react-router-dom";

function AIAssistant() {
const navigate =
useNavigate();



const questions = [

"Which subscription costs the most?",

"How much is my monthly spend?",

"What renews next?",

"Show entertainment subscriptions",

"Show music subscriptions",

"Suggest savings",

"Active subscriptions",

"Inactive subscriptions",

"Cheapest subscription",

"Yearly subscriptions",

"Monthly subscriptions",

"Annual spend",

"Total subscriptions",

"Top 3 subscriptions",

"Subscriptions above 500",

"Subscriptions above 1000",

"Average subscription cost",

"Spending summary",

"Recommend subscriptions to cancel"

];

  const [question,
  setQuestion] =
  useState("");

  const [answer,
  setAnswer] =
  useState("");

  const askAI =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "access"
      );

      const response =
      await api.post(
        "http://127.0.0.1:8000/ai-assistant/",
        {
          question
        },
        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }
      );

      setAnswer(
        response.data.answer
      );

    } catch(error){

      console.log(error);

    }

  };

  return (

    <div className="glass-card p-4">

        <button
className="premium-back-btn mb-4"
onClick={() =>
navigate("/")
}
>
← Back to Dashboard
</button>

      <h2>
        🤖 AI Assistant
      </h2>

      <input
        className="form-control mt-3"
        placeholder="Ask a question..."
        value={question}
        onChange={(e)=>
        setQuestion(
          e.target.value
        )}
      />

      <div className="ai-quick-questions">

{questions.map((q,index)=>(

<button
key={index}
className="ai-question-chip"
onClick={() =>
setQuestion(q)
}
>
{q}
</button>

))}

</div>

      

      <button
className="premium-btn mt-3"
onClick={askAI}
>
🤖 Ask AI
</button>


      {answer && (

        <div
          className="glass-card p-3 mt-4"
        >

          <h5>
            AI Response
          </h5>

          <p>
            {answer}
          </p>

        </div>

      )}

    </div>

  );

}

export default AIAssistant;