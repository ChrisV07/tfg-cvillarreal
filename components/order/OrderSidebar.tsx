import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import LogoSideBar from "../ui/LogoSideBar";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();
  

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <div className="p-5 md:p-0">
        <div className="bg-white">
          <LogoSideBar />
        </div>
        <div className="sm:hidden mt-5">
          <details className="group">
            <summary className="text-lg font-bold py-2 px-4 cursor-pointer">
              Categorías
            </summary>
            <nav className="mt-2 group-open:block hidden">
              {categories.map((category) => (
                <CategoryIcon key={category.id} category={category} />
              ))}
            </nav>
          </details>
        </div>
        <nav className="hidden sm:block mt-10 bg-white">
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
