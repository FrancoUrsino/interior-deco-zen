export async function getProducts(categoria) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const ApiBaseUrl = isProduction
      ? "https://interior-deco-zen.vercel.app"
      : "http://localhost:3000"; 

    const ApiUrl = "/api/product";
    const url = categoria ? `${ApiBaseUrl}${ApiUrl}?category=${categoria}` : `${ApiBaseUrl}${ApiUrl}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

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

