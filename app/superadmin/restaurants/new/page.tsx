import AddRestaurantForm from "@/components/restaurants/AddRestaurantForm";
import RestaurantForm from "@/components/restaurants/RestaurantForm";
import Heading from "@/components/ui/Heading";


export default function page() {
  return (
    <>
        <Heading>Nuevo Restaurante</Heading>

        <AddRestaurantForm>
          <RestaurantForm/>
        </AddRestaurantForm>


    </>
  )
}
