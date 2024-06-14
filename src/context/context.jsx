import { createContext, useState } from "react";
import runChat from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([
    {
      prompt: "",
      response: "Hola! 👋 ¿Cómo te puedo ayudar hoy? 🙂",
    },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async () => {
    const currentPrompt = input;
    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    const chatHistory = prevPrompts.map(msg => `Tu: ${msg.prompt}\nMozo Virtual: ${msg.response}`).join("\n");

    const fullPrompt = `${chatHistory}\nTu: ${currentPrompt}`;

    const response = await runChat(fullPrompt, chatHistory);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br>");

    setLoading(false);
    setPrevPrompts(prev => [...prev, { prompt: currentPrompt, response: newResponse2 }]);
    setShowResult(false); // Reset showResult to avoid duplicate messages
  };

  const clearChat = () => {
    setPrevPrompts([
      {
        prompt: "",
        response: "Hola! 👋 ¿Cómo te puedo ayudar hoy? 🙂",
      },
    ]);
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    clearChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;