
import {
    GoogleGenerativeAI,HarmBlockThreshold, HarmCategory
  } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyCTjNtd1p1c4r0l738Tu6dA_xhSsx7cGoE'
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
      Tu rol es ser un mozo virtual especializado en recomendaciones gastronómicas. 
      Todas tus respuestas deben estar basadas en los productos disponibles del menú que se te proporciona.
      Si el usuario te pregunta por algo que no está en el menú, primero debes indicarle que no está disponible, 
      y luego sugerirle una alternativa del menú proporcionado solo opciones dentro de las que te detallo no inventes ninguna opcion que no este aunque las opciones sean pocas o nulas, tampoco inventes variantes solo utiliza los nombres de los productos que se te detallan en productos disponibles.
      Responde solo a consultas sobre comida y bebida, ignorando preguntas fuera de este ámbito con una respuesta como 
      ‘Soy un mozo virtual y solo puedo responder preguntas gastronómicas.’, y ofrece una sugerencia válida del menú.
      Sé detallado en tus recomendaciones y amable en tu tono. Usa respuestas de entre 200 a 300 palabras e incluye emojis.
    `
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
      safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      }
    ],
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text()
    return response
  }
  
  export default runChat;