import { completeOrder } from "@/actions/complete-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"

type OrderCardProps = {
  order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {

  return (
    <section
      aria-labelledby="summary-heading"
      className="
        mt-16 lg:mt-0
        rounded-2xl
        bg-white
        px-5 py-6 sm:p-6 lg:p-8
        space-y-6
        border border-gray-200
        shadow-sm
      "
    >
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Cliente
        </p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">
          {order.name}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          Productos Ordenados
        </p>
        <dl className="mt-6 space-y-4">
          {order.orderProducts.map(product => (
            <div
              key={product.productId}
              className="flex items-center gap-2 border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span className="font-black">({product.quantity} {product.quantity > 1 ? 'unidades' : 'unidad'})</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {product.product.name}
              </dd>

            </div>
          ))}
          <dt className="text-sm font-medium text-gray-600">
            Total a pagar
          </dt>
          <dd className="text-xl font-bold text-indigo-600">
            {formatCurrency(order.total)}
          </dd>
        </dl>
        {/* <div className="divide-y divide-gray-200 rounded-xl border border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {order.orderProducts[0].product.name}
              </span>
              <span className="text-xs text-gray-500">
                x{order.orderProducts[0].quantity} unidades
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(order.orderProducts[0].product.price * order.orderProducts[0].quantity)}
            </span>
          </div>
        </div> */}
      </div>



      <form action={completeOrder}>
        <input
          type="hidden" 
          name="order_id" 
          value={order.id} />
        <input
          type="submit"
          className="
            w-full mt-2
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            active:scale-[0.98]
            transition
            text-white
            p-3
            uppercase
            font-semibold
            tracking-wide
            cursor-pointer
            shadow-md hover:shadow-lg
          "
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  )
}