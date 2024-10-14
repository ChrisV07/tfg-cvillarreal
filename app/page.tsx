import { auth } from "@/auth";
import ClientRedirect from "@/components/auth/ClientRedirect";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();



  if (session?.user.role == "CLIENT_USER") {
    return <ClientRedirect fallbackUrl="/menu/cafe" />;
  } else if (session?.user.role == "READY_ORDERS") {
    return redirect("/orders/readyorders");
  } else if (session?.user.role == "KITCHEN_ORDERS") {
    return redirect("/orders/kitchenorders");
  } else if (session?.user.role == "RESTO_ADMIN") {
    redirect("/admin/products");
  } else if (session?.user.role == "SUPER_ADMIN") {
    redirect("/superadmin/restaurants");
  }

  return (
    <main className="space-y-64 flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-700 to-violet-900">
      <div className=" space-y-64"></div>
    </main>
  );
}
