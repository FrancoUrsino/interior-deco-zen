import { db } from "@/db/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryOfProducts = searchParams.get("product");
    const category = searchParams.get("category");

    // Referencia a la colección de productos
    const productsCollection = collection(db, "products");

    // Construcción dinámica de la consulta con validación
    const queryProductsContraints = categoryOfProducts ? [where("product", "==", categoryOfProducts)] : [];
    const queryCategoryConstraints = category ? [where("category", "==", category)] : [];
    const productsQuery = query(productsCollection, ...queryProductsContraints, ...queryCategoryConstraints);

    // Obtener documentos de Firestore
    const snapshot = await getDocs(productsQuery);

    // Procesar los documentos y agregar el ID
    const productosFinales = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      message: "Productos obtenidos con éxito",
      error: false,
      payload: productosFinales,
    });
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return NextResponse.json({
      message: "Error al obtener los productos",
      error: true,
      payload: null,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("POST request data:", body);

    return NextResponse.json({ message: "POST recibido correctamente", data: body });
  } catch (error) {
    console.error("Error procesando POST:", error);
    return NextResponse.json({
      message: "Error procesando la solicitud",
      error: true,
    });
  }
}
