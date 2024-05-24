import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"

const adminNavigation = [
    {url: '/admin/products', text: 'Productos', blank: false, image:'/Productos.svg'},
    {url: '/admin/tables', text: 'Administrar Mesas', blank: false, image:'/Mesas.svg'},
    {url: '/admin/kitchenorders', text: 'Ordenes Cocina', blank: true, image:'/Orders.svg'},
    {url: '/order/cafe', text: 'Ver Menú', blank: true, image:'/Menu.svg'},
]

export default function AdminSidebar() {

    return (
        <>  
     
        <div className="print:hidden ">
            <Logo/>
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegación</p>
                <nav className="flex flex-col">
                    {adminNavigation.map(link => (
                        <AdminRoute 
                            key={link.url}
                            link = {link}
                        />
                    ))}
                </nav>
            </div>
        </div>
        </>

    )
}