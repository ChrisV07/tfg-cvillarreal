"use client"
import { useRouter } from "next/navigation";

type GoBackButtonProps = {
  seccion?: string
}

export default function GoBackButton({seccion} : GoBackButtonProps) {
    const router = useRouter()
  return (
    <>
     <button
          onClick={() => router.back()}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600 "
        >
          Volver a {seccion}
        </button>
    </>

  )
}
