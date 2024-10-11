
import Link from "next/link"
import DeleteRestaurantButton from "./DeleteRestaurantButton"
import { Restaurant } from "@prisma/client"

type ProductTableProps = {
    restaurants: Restaurant[]
}

export default function ProductTable({restaurants} : ProductTableProps) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-20">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Restaurante
                                    </th>
                                    
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {restaurants.map(restaurant => (
                                    <tr key={restaurant.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {restaurant.name}
                                    </td>
                                    
                                    
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <Link
                                            href={`/superadmin/restaurants/edit/${restaurant.id}`}
                                            className="text-violet-800 hover:text-violet-400 px-8"
                                        >
                                            Editar <span className="sr-only">, {restaurant.name}</span>
                                        </Link>
                                        <DeleteRestaurantButton id={restaurant.id} />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}