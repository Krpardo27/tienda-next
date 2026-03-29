import { OrderWithProducts } from "@/src/types";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <article
      className="
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm hover:shadow-md
        transition
        p-5 space-y-4
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Orden #{order.id}
          </p>
          <h2 className="text-lg font-semibold text-gray-900">
            {order.name}
          </h2>
        </div>
      </div>

      {/* LISTA DE PRODUCTOS */}
      <ul className="divide-y divide-gray-100 border-t border-gray-100">
        {order.orderProducts.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {item.product.name}
              </span>

              <span className="text-xs text-gray-500">
                ({item.quantity}{" "}
                {item.quantity > 1 ? "unidades" : "unidad"})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}