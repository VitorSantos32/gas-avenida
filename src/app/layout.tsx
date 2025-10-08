import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "Aplicativo web para pedidos de gás e água",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} ${robotoMono.className}`}
        style={{
          backgroundColor: "transparent",
          color: "##7bf84aff",
          margin: 0,
          minHeight: "100vh",
          fontFamily: "Inter, Roboto Mono, sans-serif",
        }}
      >
        <main style={{ padding: "20px", flexGrow: 1 }}>{children}</main>

        <footer
          style={{
            width: "100%",
            textAlign: "center",
            padding: "15px 0",
            fontSize: "0.9rem",
            marginTop: "40px",
          }}
        >
          © {new Date().getFullYear()} — Todos os direitos reservados
        </footer>
      </body>
    </html>
  );
}
