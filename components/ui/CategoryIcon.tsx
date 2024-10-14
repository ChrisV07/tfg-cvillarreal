"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
  onClick: () => void; // Añadir onClick como propiedad
};

export default function CategoryIcon({ category, onClick }: CategoryIconProps) {
  const params = useParams() as { category: string; restaurant: string };

  return (
    <div
      className={`${
        category.slug === params.category ? 'bg-violet-800 text-white' : ''
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      onClick={onClick} // Añadir la función onClick aquí
    >
      <div className="w-16 h-16 relative">
        <Image src={`/icon_${category.slug}.svg`} alt={`imagen categoria ${category.name}`} fill    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <Link 
        className="text-xl font-bold" 
        href={`/menu/${params.restaurant}/${category.slug}`}
      >
        {category.name}
      </Link>
    </div>
  );
}
