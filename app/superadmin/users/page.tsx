import UsersSearchForm from "@/components/users/UserSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import UsersTable from "@/components/users/UsersTable";
import Link from "next/link";

async function usersCount() {
  return await prisma.user.count();
}

async function getUsers() {
  const users = await prisma.user.findMany({
    where: {
      role: {
        notIn: ['CLIENT_USER', 'SUPER_ADMIN']
      }
    }
  });
  return users;
}


export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const usersData = getUsers();
  const totalUsersData = usersCount();

  const [users, totalUsers] = await Promise.all([
    usersData,
    totalUsersData,
  ]);
  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <>
      <div className="text-center">
        <Heading>Administrar Usuarios</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <Link
          href={"/superadmin/users/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600"
        >
          Crear Usuario
        </Link>
        <UsersSearchForm />
      </div>

      <UsersTable users={users} />
    </>
  );
}