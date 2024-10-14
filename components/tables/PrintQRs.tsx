"use client"
import { useCurrentRestaurant } from '@/hooks/use-current-session';
import { Restaurant, Table } from '@prisma/client';
import Image from 'next/image';

type PrintQRsProps = {
    tables: Table[];
    restaurants: Restaurant[]
  };


export default  function PrintQRs({tables, restaurants} : PrintQRsProps) {
const restaurantID = useCurrentRestaurant();
const tablesFiltered = tables.filter( (table) => table.restaurantID == restaurantID )
const restaurant = restaurants.find ((restaurant) => restaurant.id == restaurantID)



  return (
    <div className="grid grid-cols-4 min-w-full align-middle sm:px-6 lg:px-8 bg-white p-10 rounded-xl shadow">
    {tablesFiltered.map((table) => (
      <div key={table.id} className="p-4 items-center">
        <p className="text-center">{restaurant?.name}</p>
        <div className="text-center">
          <Image
            src={`/qr_tables/${table.qr}`}
            alt={`QR de ${table.name}`}
            width={256}
            height={256}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

          />
          <p>
            {table.name} | {table.ubication}
          </p>
        </div>
      </div>
    ))}
  </div>
  )
}
