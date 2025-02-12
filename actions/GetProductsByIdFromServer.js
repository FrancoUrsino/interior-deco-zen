import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

export const GetProductsByIdFromServer = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        payload: { id: docSnap.id, ...docSnap.data() },
        error: false,
        message: "Producto obtenido"
      };
    } else {
      return {
        payload: null,
        error: true,
        message: "Producto no encontrado"
      };
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return {
      payload: null,
      error: true,
      message: "Error al obtener el producto"
    };
  }
};
