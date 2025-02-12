import { db } from "@/db/firebase"
import { collection, getDocs } from "firebase/firestore"

const GetProductsFromServer = async () => {
  const productCollection = collection(db, "products");
  const snapshot = await getDocs(productCollection);

  return snapshot.docs.map((documentRef) => {
    const id = documentRef.id;
    const productData = {};
    productData.id = id;
    
    return productData; 
  });
};

export default GetProductsFromServer;