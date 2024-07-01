import EditTableForm from "@/components/tables/EditTableForm";
import TabletForm from "@/components/tables/TableForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { Table } from "@prisma/client";
import { notFound } from "next/navigation";

async function getTablesById(id: Table['id']) {
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
  const table = await getTablesById(params.id);

  return (
    <>
        <Heading>Editar Producto: {table.name}</Heading>
      <div className="my-6">
        <GoBackButton seccion="Administrar Mesas" />
      </div>

      <EditTableForm>
        <TabletForm table={table} showQr={false}/>
      </EditTableForm>
    </>
  );
}
