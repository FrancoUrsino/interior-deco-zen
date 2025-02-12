// api/orders/route.js
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";

// Inicializar Firebase Admin si no está inicializado
if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

const db = getFirestore();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Cuerpo recibido:", body);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: "El payload es nulo o no es un objeto" },
        { status: 400 }
      );
    }

    const { userEmail, paymentId, status, merchantOrderId, date, items, total } = body;

    if (!userEmail || !paymentId || !status || !merchantOrderId || !items || total == null) {
      return NextResponse.json(
        { error: "Datos incompletos para la orden" },
        { status: 400 }
      );
    }

    const payload = {
      paymentId,
      status,
      merchantOrderId,
      date,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("Payload a guardar:", payload);

    // Usar el email directamente en lugar de codificarlo
    const userDocRef = db.collection("users").doc(userEmail);
    const ordersRef = userDocRef.collection("orders");

    const docRef = await ordersRef.add(payload);
    console.log("Orden creada con ID:", docRef.id);

    return NextResponse.json({ message: "Orden guardada exitosamente" });
  } catch (error) {
    console.error("Error al guardar la orden:", error);
    return NextResponse.json(
      { error: error.message || "Error desconocido" },
      { status: 500 }
    );
  }
}
