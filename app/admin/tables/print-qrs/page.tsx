  import GoBackButton from "@/components/ui/GoBackButton";
  import Heading from "@/components/ui/Heading";
  import React from "react";
import PrintButton from "@/components/ui/PrintButton";
import PrintQRs from "@/components/tables/PrintQRs";
import { prisma } from "@/src/lib/prisma";


  export default async function PrintQrsPage() {
const tables = await prisma.table.findMany();
const restaurants = await prisma.restaurant.findMany();
    
    return (

      <>
        <div className="print:hidden">
        <Heading>Exportar QR's</Heading>

        <div className="my-6 flex justify-between">
          <GoBackButton seccion="Administrar Mesas" />
          <PrintButton text="QR's"/>

        </div>
        </div>

        <PrintQRs tables = {tables} restaurants = {restaurants}/>
      </>
    );
  }
