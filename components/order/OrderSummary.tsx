'use client'

import { useStore } from '@/src/store'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '@/src/utils'
import { createOrderAction } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const clearCart = useStore((state) => state.clearCart)

  const total = order.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  const handleCreateOrder = async (formData: FormData) => {
    // console.log(formData.get('name'));
    const data = {
      name: formData.get('name') as string,
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    console.log(result);
    if (!result.success) {
      result.error.issues.forEach((err) => {
        toast.error(err.message)
      });

      return
    }

    const response = await createOrderAction(data)
    // console.log(response);
    if (response?.errors) {
      response.errors.forEach((err: { message: string }) => {
        toast.error(err.message)
      });

      return
    }

    toast.success("Orden creada correctamente")
    clearCart()
  }

  return (
    <aside className="lg:max-h-screen lg:overflow-y-auto md:w-64 lg:w-96 p-5">
      <h1 className="text-3xl text-center font-black">Mi pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-5 text-gray-500">
          Aún no has agregado ningún producto
        </p>
      ) : (
        <div className="mt-5 space-y-4">

          {order.map(item => (
            <ProductDetails key={item.id} item={item} />
          ))}

          {/* Total */}
          <div className="border-t pt-4 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-700">Total</p>
            <span className="text-xl font-black text-amber-500">
              {formatCurrency(total)}
            </span>
          </div>

          <form
            action={handleCreateOrder}
            className='w-full mt-10 space-y-7'
          >

            <input
              type="text"
              placeholder='Tu nombre'
              className='bg-white border border-gray-100 p-2 w-full'
              name='name'
            />
            <input
              type="submit"
              className='py-2 rounded-md uppercase text-white font-bold bg-black w-full text-center cursor-pointer'
              value="Confirmar pedido" />
          </form>

          {/* Clear */}
          <button
            onClick={clearCart}
            className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </aside>
  )
}