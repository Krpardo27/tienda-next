import AppProviders from "@/components/providers/AppProviders";
import OrderCategoryMobileWrapper from "@/components/order/OrderCategoryMobileWrapper";
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import OrderSummaryMobile from "@/components/order/OrderSummaryMobile";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <OrderCategoryMobileWrapper />

      {/* Mobile */}
      <div className="md:hidden">
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

      <ToastNotification />
    </AppProviders>
  );
}
