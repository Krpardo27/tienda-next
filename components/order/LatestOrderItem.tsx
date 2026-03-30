import { OrderWithProducts } from "@/src/types";
import { motion } from "framer-motion";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3 }}
      className="
        flex flex-col items-center justify-center
        bg-zinc-900
        w-full
        border border-zinc-700
        rounded-3xl
        p-6
        h-48 md:h-56 xl:h-64
        shadow-xl
        text-center
      "
    >
      {/* 🔥 NUMERO GRANDE */}
      <span className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-amber-400">
        #{order.id}
      </span>

      {/* 🔥 NOMBRE (controlado) */}
      <span
        className="
          text-sm md:text-base xl:text-lg
          text-zinc-300
          mt-3
          uppercase
          tracking-wide
          w-full
          
        "
        title={order.name}
      >
        {order.name}
      </span>
    </motion.article>
  );
}