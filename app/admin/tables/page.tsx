import TablesTable from "@/components/tables/TablesTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function tableCount() {
  return await prisma.table.count();
}

async function getTables() {
  const tables = await prisma.table.findMany();
  return tables;
}

export default async function TablesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const tablesData = getTables();
  const totalTablesData = tableCount();

  const [tables, totalTables] = await Promise.all([tablesData, totalTablesData]);
  const totalPages = Math.ceil(totalTables / pageSize);

  return (
    <>
      <div className="text-center">
        <Heading>Administrar Mesas</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/tables/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600"
        >
          Crear Mesa
        </Link>
      </div>

      <TablesTable tables={tables} initialPage={page} pageSize={pageSize} />
    </>
  );
}