import Heading from "@/components/ui/Heading";
import Link from "next/link";


export default function NotFound() {
  return (

    <div className="text-center">
        <Heading>Producto No Encontrado </Heading>
        <Link
            href={'/admin/products'}
            className="bg-violet-800 text-white px-10 py-3 text-xl font-bold  text-center cursor-pointer w-full lg:w-auto rounded-lg"
        >Ir a Productos</Link>
    </div>
  )
}
