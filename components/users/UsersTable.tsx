import Link from "next/link";
import DeleteUserButton from "./DeleteUserButton";
import { Restaurant, User } from "@prisma/client";
import { UserWithRestaurant } from "@/src/types";

type UsersTableProps = {
  users: UserWithRestaurant[]

};

export default function ProductTable({ users }: UsersTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Usuario
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Restaurante
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rol
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.restaurant?.name || "No asignado"}{" "}
                      {/* Nombre del restaurante o 'No asignado' */}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.role === "RESTO_ADMIN"
                        ? "Administrador de Restaurante"
                        : user.role === 'SUPER_ADMIN' ? 'Super Administrador'
                        : user.role === 'KITCHEN_ORDERS' ? 'Ordenes Cocina'
                        : user.role === 'READY_ORDERS' ? 'Ordenes Listas'
                        : 'Cliente'
                    }
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link
                        href={`/superadmin/users/edit/${user.id}`}
                        className="text-violet-800 hover:text-violet-400 px-8"
                      >
                        Editar <span className="sr-only">, {user.name}</span>
                      </Link>
                      <DeleteUserButton id={user.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
