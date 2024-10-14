import Image from "next/image";
import React from "react";

interface LogoProps {
  imagePath?: string;
}

export default function Logo({ imagePath }: LogoProps) {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-48 h-48">
        <Image fill alt="Logotipo del Restaurante" src={imagePath!} />
      </div>
    </div>
  );
}
