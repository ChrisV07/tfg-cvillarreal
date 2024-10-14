import { Restaurant } from "@prisma/client"
import RestaurantImageUpload from "./ImageUpload"

type RestaurantFormProps = {
  restaurant?: Restaurant
}

export default function RestaurantForm({ restaurant }: RestaurantFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="name"
        >
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="Nombre Restaurante"
          defaultValue={restaurant?.name}
        />
      </div>

      <RestaurantImageUpload image={restaurant?.image} />
    </>
  )
}