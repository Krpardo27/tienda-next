import { useStore } from '@/src/store';
import { OrderItem } from '@/src/types'
import { formatCurrency } from '@/src/utils';
import { XCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import { useMemo } from 'react';


type ProductDetailsProps = {
  item: OrderItem
}

const MAX_ITEMS = 10

export default function ProductDetails({ item }: ProductDetailsProps) {

  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem);
  const disableIncrease = useMemo(() => item.quantity === MAX_ITEMS, [item]);

  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">

      {/* Imagen */}
      <div className="relative w-24 h-24 min-w-[96px] rounded-xl overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={`/products/${item.image}.jpg`}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">

        {/* Top */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm md:text-base text-gray-800 leading-tight line-clamp-2">
            {item.name}
          </h3>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition shrink-0"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Precio */}
        <p className="text-base font-bold text-amber-500 mt-1">
          {formatCurrency(item.price)}
        </p>

        {/* Bottom */}
        <div className="flex flex-col items-start mt-2 gap-2">

          {/* Quantity */}
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full shrink-0">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="p-1 rounded-full hover:bg-gray-200 transition"
            >
              <MinusIcon className="h-4 w-4 text-gray-700" />
            </button>

            <span className="text-sm font-semibold w-4 text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="p-1 rounded-full hover:bg-gray-200 transition"
              disabled={disableIncrease}
            >
              <PlusIcon className="h-4 w-4 text-gray-700" />
            </button>
          </div>

          {/* Subtotal */}
          <p className="text-sm font-semibold text-gray-700 truncate">
            <span className="text-gray-400 mr-1">Subtotal</span>
            {formatCurrency(item.subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
