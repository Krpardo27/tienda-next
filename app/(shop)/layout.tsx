import OrderCategoryMobileWrapper from "@/src/components/order/OrderCategoryMobileWrapper";
import OrderSidebar from "@/src/components/order/OrderSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <OrderCategoryMobileWrapper />
      <div className="md:flex min-h-screen">
        <OrderSidebar />

        <main className="flex-1 p-5 min-h-screen md:overflow-y-auto md:h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
