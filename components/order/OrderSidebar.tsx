import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";
import Link from "next/link";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar({ tableId }: { tableId?: string }) {
  const categories = await getCategories();

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map(category => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
      {tableId && (
        <div className="mt-5 p-3 bg-purple-800">
          Mesa seleccionada: {tableId}
        </div>
      )}
    </aside>
  );
}
