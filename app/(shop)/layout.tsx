import OrderCategoryMobileWrapper from "@/src/components/order/OrderCategoryMobileWrapper";
import OrderSidebar from "@/src/components/order/OrderSidebar";
import OrderSummary from "@/src/components/order/OrderSummary";
import OrderSummaryMobile from "@/src/components/order/OrderSummaryMobile";
import AppProviders from "@/src/components/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <OrderCategoryMobileWrapper />
      {/* Mobile */}
      <div className="lg:hidden">
        <OrderSummaryMobile />
      </div>

      {/* Desktop */}
      <div className="md:flex min-h-screen">
        <OrderSidebar />

        <main className="flex-1 p-5 min-h-screen lg:h-screen lg:overflow-y-auto">
          {children}
        </main>

        <div className="hidden md:block">
          <OrderSummary />
        </div>
      </div>

    </AppProviders>
  );
}
