/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyCTjNtd1p1c4r0l738Tu6dA_xhSsx7cGoE";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Tu rol es ser un mozo virtual especializado en recomendaciones gastronómicas. Responde solo a consultas sobre comida, ignorando preguntas fuera de este ámbito con una respuesta como ‘Soy un mozo virtual y solo puedo responder preguntas gastronómicas.’ y agrega alguna pregunta que si podrias ser valida. Proporciona recomendaciones detalladas, explicando el porqué, y sé amable. Evita saludar en cada mensaje. Usa respuestas de 200 a 300 palabras, incluyendo emojis, y habla en español argentino. Cuando te pregunten ‘¿Qué puedo tomar?’, sugiere una bebida para acompañar."
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    
  };
  
  async function runChat(prompt) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text()
    return response
  }
  
  export default runChat;