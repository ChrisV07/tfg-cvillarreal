"use client"
import { ProductSchema } from "@/src/schema";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { createProduct } from "@/actions/create-product-action";
import { useRouter } from "next/navigation";


export default function AddProductForm({children} : {children : React.ReactNode}) {

    const router = useRouter()
    
    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        const result = ProductSchema.safeParse(data)

        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'})
            })
            return
        }
        const response = await createProduct(result.data)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message, {theme: 'dark'})
            })
            return
        }
        router.push('/admin/products')
        toast.success('Producto Creado Exitosamente', {theme: 'dark'})
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
                  value={'Registrar Producto'}/>
          </form>
  
      </div>
    )
  }
  
  