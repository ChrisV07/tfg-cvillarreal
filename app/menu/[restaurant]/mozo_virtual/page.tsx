/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Context } from "@/src/context/context";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

type Message = {
  prompt: string;
  response: string;
};

const ChatPage = () => {
  const context = useContext(Context);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const url = localStorage.getItem('redirectUrl')

  if (!context) {
    return null;
  }

  const { onSent, recentPrompt, prevPrompts, showResult, resultData, setInput, input, clearChat, loading } = context;

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [prevPrompts, showResult]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input.trim()) {
      onSent();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg relative">
      <div className="flex items-center justify-between bg-white text-center text-xl font-bold p-4 border-b border-gray-300 fixed w-full max-w-md top-0 z-10">
        <h1 className="flex-1">Mozo Virtual</h1>
        <Link href={url!}>
          <XCircleIcon className="text-red-600 h-8 w-8 cursor-pointer" />
        </Link>
      </div>
      <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100 pt-36 pb-20"> {/* Ajuste en pt-28 */}
        {prevPrompts.map((item: Message, index: number) => (
          <div key={index} className="space-y-4">
            {item.prompt && (
              <>
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
                    <p className="break-words">{item.prompt}</p>
                  </div>
                </div>
              </>
            )}

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
                <p className="break-words" dangerouslySetInnerHTML={{ __html: item.response }}></p>
              </div>
            </div>
          </div>
        ))}

        {showResult && recentPrompt && (
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
                {loading ? "..." : <p className="break-words" dangerouslySetInnerHTML={{ __html: resultData }}></p>}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} /> {/* Add a reference to the bottom of the chat */}
      </div>
      <div className="p-4 border-t border-gray-300 bg-white fixed bottom-0 w-full max-w-md">
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border bg-gray-200 rounded-xl focus:outline-none"
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            value={input}
          />
          <button
            disabled={!input.trim()}
            className="px-4 py-2 bg-violet-800 text-white rounded-lg disabled:bg-slate-400"
            onClick={() => onSent()}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;