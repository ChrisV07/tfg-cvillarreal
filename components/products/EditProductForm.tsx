"use client"
import { ProductSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/update-product-action";
import { useParams } from "next/navigation";
import { useCurrentRestaurant } from "@/hooks/use-current-session";


export default function EditProductForm({children} : {children : React.ReactNode}) {

    const router = useRouter()
    const params = useParams()
    const id = +params.id!
    const restaurantID = useCurrentRestaurant()
    
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image'),
            qr: formData.get('qr'),
            restaurantID
        }
        
        const result = ProductSchema.safeParse(data)

        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'})
            })
            return
        }
        const response = await updateProduct(result.data, id)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'})
            })
            return
        }
        router.push('/admin/products')
        toast.success('Producto Modificado Exitosamente', {theme: 'dark'})
    }

    return (
      <div className="bg-white mt-1 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
  
          <form 
                action={handleSubmit}
                className="space-y-5">

            {children}

              <input 
                  type="submit" 
                  className="bg-pink-600 hover:bg-pink-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                  value={'Guardar Cambios'}/>
          </form>
  
      </div>
    )
  }
  
  