"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{category: string, restaurant: string}>();

  return (
    <div
      className={`${
        category.slug === params.category ? 'bg-violet-800 text-white' : ''
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image src={`/icon_${category.slug}.svg`} alt={`imagen categoria ${category.name}`} fill />
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