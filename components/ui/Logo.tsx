import Image from "next/image";
import React from "react";

interface LogoProps {
  imagePath?: string;
}

export default function Logo({ imagePath }: LogoProps) {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-48 h-48">
        <Image fill alt="Logotipo del Restaurante" src={imagePath!}   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority
        />
      </div>
    </div>
  );
}
