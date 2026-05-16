import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="
        relative
        rounded-2xl
        bg-white 
        px-5 py-6 sm:p-6 lg:p-7
        space-y-6
        border border-zinc-200 
        shadow-xs
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/10
        hover:-translate-y-0.5
        group
      "
    >
      {/* Badge ID */}
      <span
        className="
        absolute top-4 right-4
        text-xs font-semibold
        px-2 py-1 rounded-full
        bg-zinc-100  text-zinc-600 
        border border-zinc-200 
      "
      >
        #{order.id}
      </span>

      {/* 🔥 Cliente */}
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-widest text-zinc-400">
          Cliente
        </p>
        <p className="text-xl md:text-2xl font-bold text-zinc-900">
          {order.name}
        </p>
      </div>

      {/* 🔥 Productos */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-3">
          Productos
        </p>

        <dl className="space-y-3">
          {order.orderProducts.map((product) => (
            <div
              key={product.productId}
              className="
                flex items-center justify-between
                gap-3
                border border-zinc-100 
                rounded-xl
                px-3 py-2
                transition
                group-hover:bg-zinc-50 
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                  text-xs font-bold
                  px-2 py-0.5
                  rounded-md
                  bg-amber-100 text-amber-700
                "
                >
                  x{product.quantity}
                </span>

                <span className="text-sm font-medium text-zinc-800 ">
                  {product.product.name}
                </span>
              </div>

              <span className="text-sm font-semibold text-zinc-500">
                {product.quantity > 1 ? "unidades" : "unidad"}
              </span>
            </div>
          ))}
        </dl>
      </div>

      {/* 🔥 Total */}
      <div
        className="
        flex items-center justify-between
        pt-4
        border-t border-zinc-200 
      "
      >
        <span className="text-sm text-zinc-500">Total</span>

        <span className="text-xl font-bold text-amber-600">
          {formatCurrency(order.total)}
        </span>
      </div>

      {/* 🔥 Hover Glow */}
      <div
        className="
        pointer-events-none
        absolute inset-0 rounded-2xl
        opacity-0 
        transition
        bg-linear-to-br from-amber-500/10 to-transparent
      "
      />
    </section>
  );
}
