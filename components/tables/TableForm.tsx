
import { Table } from "@prisma/client";
import Image from "next/image";

type TableFormProps = {
  table?: Table;
  showQr: boolean
};

export default async function TabletForm({ table, showQr }: TableFormProps) {
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
          placeholder="Nombre Mesa. Por Ejemplo: Mesa 1"
          defaultValue={table?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="ubication">
          Ubicación:
        </label>
        <input
          id="ubication"
          name="ubication"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="Ubicación Mesa"
          defaultValue={table?.ubication}
        />
      </div>
      {showQr && (

      <div className="space-y-2 flex">
        <label className="text-slate-800" htmlFor="qr">
          QR:
        </label>
        <div className="flex justify-center w-full">
          <div className="flex justify-center">
            <Image
              src={`/qr_tables/${table?.qr}`}
              alt="imagen mesa"
              width={256}
              height={256}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            />
          </div>
        </div>
      </div>
      )}
    </>
  );
}
