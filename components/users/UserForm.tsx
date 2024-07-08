import { prisma } from "@/src/lib/prisma";
import { User } from "@prisma/client";

type UserFormProps = {
  user?: User;
  isRegister?: Boolean;
};

async function getRestaurants() {
  return await prisma.restaurant.findMany();
}

export default async function UserForm({ user, isRegister }: UserFormProps) {
  const restaurants = await getRestaurants();
  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="John Doe"
          defaultValue={user?.name!}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="johndoe@correo.com"
          defaultValue={user?.email!}
        />
      </div>

      {isRegister && (
        <div className="space-y-2">
          <label className="text-slate-800" htmlFor="password">
             Contraseña:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="block w-full p-3 bg-slate-100 rounded-lg"
            placeholder="********"
            defaultValue=""
          />
        </div>
      )}


      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="role">
          Rol:
        </label>
        <select
          className="block w-full p-3 bg-slate-100 rounded-lg"
          id="role"
          name="role"
          defaultValue={user?.role}
        >
          <option value="">-- Seleccione --</option>
          <option value="CLIENT_USER">Cliente</option>
          <option value="RESTO_ADMIN">Administrador del Restaurante</option>
          <option value="KITCHEN_ORDERS">Ordenes Cocina</option>
          <option value="READY_ORDERS">Ordenes Listas</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="restaurantID">
          Restaurante:
        </label>
        <select
          className="block w-full p-3 bg-slate-100 rounded-lg"
          id="restaurantID"
          name="restaurantID"
          defaultValue={user?.restaurantID!}
        >
          <option value="">-- Seleccione --</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}