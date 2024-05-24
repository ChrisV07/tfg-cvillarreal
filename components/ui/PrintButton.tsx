"use client"

import React from 'react';

type PrintButtonProps = {
    text?: string
  }

export default function PrintButton({text}: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button 
    className="bg-pink-600 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-pink-800 "
    onClick={handlePrint}>Imprimir {text}</button>
  );
};


