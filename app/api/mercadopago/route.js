import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const { items } = JSON.parse(bodyText);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay productos en el carrito" }, { status: 400 });
    }

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const service = subtotal * 0.09;
    const shippingCost = subtotal >= 250000 ? 0 : 10;
    const total = subtotal + service + shippingCost;

    const orderData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total,
      items,
    };

    const preferenceData = {
      items: [
        ...items.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          currency_id: "ARS",
          unit_price: Number(item.price),
        })),
        {
          title: "Costo de servicio",
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(service.toFixed(2)),
        },
        {
          title: "Costo de envío",
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(shippingCost.toFixed(2)),
        }
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    const preferenceClient = new Preference(mercadopago);
    const response = await preferenceClient.create({ body: preferenceData });

    return NextResponse.json({ url: response.init_point });
  } catch (error) {
    console.error("Error en MercadoPago:", error);
    return NextResponse.json({ error: error.message || "Error desconocido" }, { status: 500 });
  }
}
