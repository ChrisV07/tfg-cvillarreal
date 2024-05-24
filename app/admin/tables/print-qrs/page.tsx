  import GoBackButton from "@/components/ui/GoBackButton";
  import Heading from "@/components/ui/Heading";
  import Image from "next/image";
  import { prisma } from "@/src/lib/prisma";
  import React from "react";
import PrintButton from "@/components/ui/PrintButton";


  export default async function PrintQrsPage() {
    
    const tables = await prisma.table.findMany();
    
    return (

      <>
        <div className="print:hidden">
        <Heading>Exportar QR's</Heading>

        <div className="my-6 flex justify-between">
          <GoBackButton seccion="Administrar Mesas" />
          <PrintButton text="QR's"/>

        </div>
        </div>

        <div className="grid grid-cols-4 min-w-full align-middle sm:px-6 lg:px-8 bg-white p-10 rounded-xl shadow">
          {tables.map((table) => (
            <div key={table.id} className="p-4 items-center">
              <p className="text-center">The Resto</p>
              <div className="text-center">
                <Image
                  src={`/qr_tables/${table.qr}`}
                  alt={`QR de ${table.name}`}
                  width={256}
                  height={256}
                />
                <p>
                  {table.name} | {table.ubication}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
