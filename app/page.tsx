import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user.role == "CLIENT_USER") {
    redirect("/menu/cafe");
  } else if (session?.user.role == "READY_ORDERS") {
    redirect("/readyorders");
  } else if (session?.user.role == "KITCHEN_ORDERS") {
    redirect("/admin/kitchenorders");
  } else if (session?.user.role == "RESTO_ADMIN") {
    redirect("/admin/products");
  }
  return (
    <main className="space-y-64 flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-700 to-violet-900">
      <div className=" space-y-64">
        <h1> Hola Mundo </h1>
      </div>
    </main>
  );
}
