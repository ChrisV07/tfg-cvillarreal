"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

type FloatingCartButtonProps = {
  itemCount: number;
};

const FloatingCartButton = ({ itemCount }: FloatingCartButtonProps) => {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={scrollToBottom}
        className="bg-purple-800 text-white p-4 rounded-full shadow-lg focus:outline-none relative"
      >
        <FaShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingCartButton;