import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"

const adminNavigation = [
  { url: '/admin/orders', text: 'Órdenes', blank: false },
  { url: '/admin/products', text: 'Productos', blank: false },
  { url: '/order/cafe', text: 'Ver Quiosco', blank: true },
]

export default function AdminSidebar() {

  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <nav className="flex flex-col">
          {adminNavigation.map((link) => (
            <AdminRoute 
              key={link.url} 
              link={link} />
          ))}
        </nav>
      </div>
    </>

  )
}