import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();
    console.log("📊 Total de órdenes en DB:", totalOrders);

    const ordersWithReadyAt = await prisma.order.count({
      where: {
        orderReadyAt: { not: null },
      },
    });
    console.log("📊 Órdenes con orderReadyAt no null:", ordersWithReadyAt);

    // Obtén las últimas 5 órdenes para ver sus datos
    const sampleOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        orderReadyAt: true,
        status: true,
      },
    });
    console.log("📊 Muestra de órdenes:", sampleOrders);

    const ONE_MINUTE = 1 * 60 * 1000;
    const cutoff = new Date(Date.now() - ONE_MINUTE);
    console.log("⏰ Cutoff time:", cutoff.toISOString());

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

    console.log(`✅ Órdenes encontradas: ${orders.length}`);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("❌ ERROR COMPLETO:");
    console.error(error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Error al cargar órdenes",
          details: error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: "Error desconocido" }, { status: 500 });
  }
}
