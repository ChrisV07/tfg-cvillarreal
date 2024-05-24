import EditTableForm from "@/components/tables/EditTableForm";
import TabletForm from "@/components/tables/TableForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getTablesById(id: number) {
  const table = await prisma.table.findUnique({
    where: {
      id,
    },
  });
  if (!table) {
    notFound();
  }
  return table;
}

export default async function EditTablesPage({
  params,
}: {
  params: { id: string };
}) {
  const table = await getTablesById(+params.id);

  return (
    <>
        <Heading>Detalles: {table.name}</Heading>
      <div className="my-6">
        <GoBackButton seccion="Administrar Mesas" />
      </div>

      <div className="bg-white px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto mt-4">
            <TabletForm table={table} showQr={true}/>
        </div>
     
    </>
  );
}
