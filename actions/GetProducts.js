export async function getProducts(categoria) {
  try {
    const url = categoria
      ? `http://localhost:3000/api/product?category=${categoria}`
      : "http://localhost:3000/api/product";

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    const { payload: products } = await response.json();

    return {
      payload: products,
      message: "Se obtuvieron los productos",
      error: false,
    };
  } catch (error) {
    console.error("Error en getProducts:", error);

    return {
      payload: null,
      message: "No se pudieron obtener los productos",
      error: true,
    };
  }
}
