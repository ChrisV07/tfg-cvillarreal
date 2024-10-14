"use client";

import { useParams } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { getRestaurantImagePath } from "@/src/utils";
import { getRestaurant } from "@/actions/get-restaurant-action";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function LogoSideBar() {
  const params = useParams();
  const restaurantId = params.restaurant as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const restaurantData = await getRestaurant(restaurantId);
        setRestaurant(restaurantData);

        if (restaurantData?.image) {
          const restaurantImagePath = await getRestaurantImagePath(
            restaurantData.image
          );
          setImagePath(restaurantImagePath!);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    }

    fetchData();
  }, [restaurantId]);

  console.log('image path', imagePath);
  console.log('restaurantId', restaurantId);
  console.log('restaurant', restaurant);

  return (
    <>
      {imagePath ? (
        <Logo imagePath={imagePath} />
      ) : (
        <p>Cargando imagen...</p> // O un mensaje de error
      )}
    </>
  );
}
