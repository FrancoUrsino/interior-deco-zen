import { doc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";

export const GetProductsById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};