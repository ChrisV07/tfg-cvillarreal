import RestaurantSearchForm from "@/components/restaurants/RestaurantSearchForm";
import RestaurantsTable from "@/components/restaurants/RestaurantsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import React, { Suspense } from "react";

async function searchRestaurants(searchTerm: string) {
  const products = await prisma.restaurant.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const restaurants = await searchRestaurants(searchParams.search);

  return (
    <Suspense>
    <>
      <Heading>Resultados de Búsqueda: {searchParams.search}</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <RestaurantSearchForm />
      </div>

      {restaurants.length ? (
        <RestaurantsTable restaurants={restaurants} />
      ) : (
        <p className="text-center text-lg py-10">
          No se encontraron resultados con el termino &quot;{searchParams.search}&quot;
        </p>
      )}
    </>
    </Suspense>
  );
}
