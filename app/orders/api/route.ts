import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const THREE_MINUTES = 3 * 60 * 1000;
    const cutoff = new Date(Date.now() - THREE_MINUTES);

    const orders = await prisma.order.findMany({
      take: 10,
      where: {
        orderReadyAt: {
          not: null,
          gte: cutoff, 
        },
      },
      orderBy: {
        orderReadyAt: "desc",
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return Response.json(orders);
  } catch (error) {
    console.error("ERROR /orders/api:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
