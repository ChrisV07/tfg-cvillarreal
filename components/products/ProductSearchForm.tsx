"use client"

import { SearchSchema } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {

    const router = useRouter()

    const handleSearchForm = (formData : FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)

        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message, {theme: "dark"})
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)

    }  

  return (
    <form 
        action={handleSearchForm}
        className="flex items-center"
        >
        <input
            type="text"
            placeholder="Buscar Producto"
            className="p-3 placeholder-gray-400 w-full rounded-l-lg"
            name="search"
        />
        <input 
            type="submit" 
            value={'Buscar'} 
            className="bg-pink-600 w-full lg:w-auto text-xl px-10 py-3 text-center text-white font-bold cursor-pointer hover:bg-pink-900 rounded-lg"
        
        />
    </form>
  )
}
