import EditRestaurantForm from "@/components/restaurants/EditRestaurantForm"
import RestaurantForm from "@/components/restaurants/RestaurantForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { Restaurant } from "@prisma/client"

import { notFound } from "next/navigation"

async function getRestaurantById(id: Restaurant['id']){
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id
        }
    })
    if(!restaurant){
        notFound()
    }
    return restaurant
}

export default async function EditRestaurantPage({params} : {params: {id: Restaurant['id']}}) {
  
    const restaurant = await getRestaurantById(params.id)
  
    return (
    <>
        
        <Heading>Editar Restaurante: {restaurant.name}</Heading>


       <GoBackButton seccion="Restaurantes"/>

        <EditRestaurantForm>
            <RestaurantForm
                restaurant= {restaurant}
            />
        </EditRestaurantForm>

    </>
  )
}
