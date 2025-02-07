import { db } from "@/db/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryOfProducts = searchParams.get("product");
    const category = searchParams.get("category");

    const productsCollection = collection(db, "products");

    let constraints = [];
    if (categoryOfProducts) constraints.push(where("product", "==", categoryOfProducts));
    if (category) constraints.push(where("category", "==", category));

    const productsQuery = query(productsCollection, ...constraints);
    const snapshot = await getDocs(productsQuery);

    const productosFinales = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      {
        message: "Productos obtenidos con éxito",
        error: false,
        payload: productosFinales,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return NextResponse.json(
      {
        message: "Error al obtener los productos",
        error: true,
        payload: null,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("POST request data:", body);

    return NextResponse.json(
      { message: "POST recibido correctamente", data: body },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error procesando POST:", error);
    return NextResponse.json(
      {
        message: "Error procesando la solicitud",
        error: true,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
