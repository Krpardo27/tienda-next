import OrderCategoryMobileWrapper from "@/components/order/OrderCategoryMobileWrapper";
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import OrderSummaryMobile from "@/components/order/OrderSummaryMobile";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <OrderCategoryMobileWrapper />
      <OrderSummaryMobile />
      <div className="md:flex">
        <OrderSidebar />
        <main className="lg:flex-1 p-5">{children}</main>
        <OrderSummary />
      </div>
      <ToastNotification />
    </>
  );
}
