import Pagination from "@/components/ui/Pagination";
import TablesTable from "@/components/tables/TablesTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function tablesCount() {
  return await prisma.table.count();
}

async function getTables(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const tables = await prisma.table.findMany({
     take: pageSize,
     skip,
  });

  return tables;
}

export default async function TablesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const tablesData = getTables(page, pageSize);
  const totalTablesData = tablesCount();

  const [tables, totalTables] = await Promise.all([
    tablesData,
    totalTablesData,
  ]);
  const totalPages = Math.ceil(totalTables / pageSize);

  return (
    <>
    <div className="text-center">
      <Heading>Administrar Mesas</Heading>
    </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/tables/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600 "
        >
          Crear Mesa
        </Link>

        <Link
          href={"/admin/tables/print-qrs"}
          className="bg-pink-600 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-pink-800 "
        >
          Imprimir QR's
        </Link>

      </div>

      {tables.length > 0 ? (
        <TablesTable tables={tables} />
      ) : (
        <p className="text-gray-600 text-lg mt-40 text-center">
          No existen Mesas en la base de datos.
        </p>
      )}

      <Pagination page={page} totalPages={totalPages} path='/admin/tables' />
    </>
  );
}
