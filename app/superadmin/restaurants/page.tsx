import RestaurantSearchForm from "@/components/restaurants/RestaurantSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import RestaurantTable from "@/components/restaurants/RestaurantsTable";

async function restaurantsCount() {
  return await prisma.restaurant.count();
}

async function getRestaurants() {
  const restaurants = await prisma.restaurant.findMany();
  return restaurants;
}


export default async function RestaurantPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const restaurantsData = getRestaurants();
  const totalRestaurantsData = restaurantsCount();

  const [restaurants, totalRestaurants] = await Promise.all([
    restaurantsData,
    totalRestaurantsData,
  ]);
  const totalPages = Math.ceil(totalRestaurants / pageSize);

  return (
    <>
      <div className="text-center">
        <Heading>Administrar Restaurantes</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/superadmin/restaurants/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600"
        >
          Crear Restaurante
        </Link>

        <RestaurantSearchForm />
      </div>

      <RestaurantTable restaurants={restaurants} />
    </>
  );
}