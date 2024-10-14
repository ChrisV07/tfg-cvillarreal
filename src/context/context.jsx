import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { getRestaurantProducts } from "@/actions/get-products-action";

export const Context = createContext();

const ContextProvider = ({ restaurantId, children }) => {
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

  const delayParam = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord + " ");
    }, 75 * index);
  };

  const onSent = async () => {
    const currentPrompt = input;
    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);
  
    // Aquí se utiliza el restaurantId que viene de las props
    const products = await getRestaurantProducts(restaurantId);
  
    // Generamos el historial del chat para enviar junto con el nuevo prompt
    const chatHistory = prevPrompts
      .map((msg) => `Tu: ${msg.prompt}\nMozo Virtual: ${msg.response}`)
      .join("\n");
    
    // El prompt completo incluye el historial
    const fullPrompt = `
      ${chatHistory}
      Tu: ${currentPrompt}
      Mozo Virtual:
      
      Solo debes sugerir productos del siguiente menú disponible:
      Productos disponibles: ${products.join(", ")}
    `;
  
  
    // Envía el historial junto con el nuevo mensaje
    const response = await runChat(fullPrompt);
  
  
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
  
    for (let i = 0; i < newResponseArray.length; i++) {
      delayParam(i, newResponseArray[i]);
    }
  
    setLoading(false);
    setPrevPrompts((prev) => [
      ...prev,
      { prompt: currentPrompt, response: newResponse2 },
    ]);
    setShowResult(false);
  
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

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
