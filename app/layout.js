import { Shadows_Into_Light, Raleway, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartProvider from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  weight: "400",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const imbPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interiors Deco Zen - Home Page",
  description: "Tienda online de muebles, iluminación y decoración. Encuentra sofás, lámparas, accesorios y más para tu hogar. Envíos rápidos y atención personalizada. ",
  icons: {
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
  authors: [{ name: "Franco Ezequiel Ursino" }],
  keywords: "comercio, mueble, muebles, silla, sillas, mesa, mesas, sillon, sillón, sofá, sofa, mesita, mesitas, sillones, cama, camas, respaldos, respaldos de cama, colección de muebles, reposeras, luces, iluminación, iluminacion, lámparas, lampara, lamparas, lamparas de techo, colgantes, lamparas colgantes, lamparas de pie, veladores, velador, deco, decoración, decoracion, decoraciones, maceta, planta, macetas, plantas, cuadro, cuadros, conjunto de cuadros, abstractos, cuadros abstractos, espejos, espejo, espejos grandes, espejos chicos, living, comedor, cocina, dormitorio, pieza, cuarto, interior, exterior, interiores modernos",
  openGraph: {
    title: 'Interior Deco Zen - Tienda de Muebles, iluminación y Decoración',
    description: 'Muebles modernos, lámparas elegantes y accesorios decorativos para transformar tu hogar.',
    url: 'https://interior-deco-zen.vercel.app/',
    type: 'website',
    locale: 'es_Ar',
    siteName: 'Interior Deco Zen',
    images: [
      {
        url: 'https://interior-deco-zen.vercel.app/decoBanner.jpg',
        width: 1200,
        height: 630,
        alt: 'Muebles modernos para tu hogar',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://interior-deco-zen.vercel.app/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${shadowsIntoLight.variable} ${raleway.variable} ${imbPlexSerif.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <ToastContainer position="bottom-right" autoClose={2500} theme="dark" />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}