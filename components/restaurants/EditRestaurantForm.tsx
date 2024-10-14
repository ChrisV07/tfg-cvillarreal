'use client'

import { RestaurantSchema } from "@/src/schemas"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation"
import { updateRestaurant } from "@/actions/update-restaurant-action"
import { useParams } from "next/navigation"

export default function EditRestaurantForm({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : params.id[0]

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      image: formData.get('image'),
    }

    const result = RestaurantSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message, { theme: 'dark' })
      })
      return
    }

    const response = await updateRestaurant(result.data, id)
    if (response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message, { theme: 'dark' })
      })
      return
    }
    router.push('/superadmin/restaurants')
    toast.success('Restaurante Modificado Exitosamente', { theme: 'dark' })
  }

  return (
    <div className="bg-white mt-1 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        action={handleSubmit}
        className="space-y-5"
      >
        {children}
        <input
          type="submit"
          className="bg-pink-600 hover:bg-pink-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
          value={'Guardar Cambios'}
        />
      </form>
    </div>
  )
}