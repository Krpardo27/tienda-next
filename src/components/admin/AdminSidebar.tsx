import Logo from "../ui/Logo"
import LogoutButton from "../ui/LogoutButton"
import AdminRoute from "./AdminRoute"

const adminNavigation = [
  { url: '/dashboard/orders', text: 'Órdenes', blank: false },
  { url: '/dashboard/products', text: 'Productos', blank: false },
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