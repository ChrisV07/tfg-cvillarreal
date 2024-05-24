"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import OrderCard from "@/components/order/OrderCard";
import LatestOrderItem from "@/components/order/LatestOrderItem";


export default function ReadyOrdersPage() {

  const url = '/readyorders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,

  })

  if(isLoading) return <p>Cargando...</p>
  
  if(data) return(

    <>
      <h1 className="text-center mt-20 text-4xl font-black">Ordenes Listas</h1>

      <Logo/>

      {data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map(order => (
            <LatestOrderItem
              key={order.id}
              order={order}
            />

          ))}
        </div>
      ) : <p className="text-center my-10 text-xl">No Hay Ordenes Listas </p>}


    </>
  )
}
