"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Context } from "@/src/context/context";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

const page = () => {
  const { onSent, recentPrompt, showResult, resultData, setInput, input } =
    useContext(Context);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <div className="flex bg-white text-center text-xl font-bold p-4">
        <h1 className="flex-1 justify-center">Mozo Virtual</h1>
        <XCircleIcon className="text-red-600 h-8 w-8 justify-end" />

        </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100">
        <div className="flex items-start">
          <Avatar>
            <AvatarFallback className="bg-violet-800 text-white">
              <FaRobot />
            </AvatarFallback>
          </Avatar>
          <p className="p-2 text-slate-500 font-semibold">Mozo Virtual</p>
        </div>

        <div className="flex items-center gap-4 bg-violet-800 text-white rounded-lg p-4">
          <div className="flex-1">
            <p className="break-words">Hola! 👋 ¿Cómo te puedo ayudar hoy? 🙂</p>
          </div>
        </div>

        {showResult && (
          <div className="space-y-4">
            <div className="flex justify-end items-center">
              <p className="p-2 text-slate-500 font-semibold">Tu</p>
              <Avatar>
                <AvatarFallback className="bg-pink-600 text-white">
                  <FaUser />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-end items-center gap-4 bg-pink-600 text-white rounded-lg p-4">
              <div className="flex-1">
                <p className="break-words">{recentPrompt}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Avatar>
                <AvatarFallback className="bg-violet-800 text-white">
                  <FaRobot />
                </AvatarFallback>
              </Avatar>
              <p className="p-2 text-slate-500 font-semibold">Mozo Virtual</p>
            </div>

            <div className="flex items-center gap-4 bg-violet-800 text-white rounded-lg p-4">
              <div className="flex-1">
                <p className="break-words" dangerouslySetInnerHTML={{ __html: resultData }}></p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-300 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border bg-gray-200 rounded-xl focus:outline-none"
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="px-4 py-2 bg-violet-800 text-white rounded-lg"
            onClick={() => onSent()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;