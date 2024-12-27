


import localFont from "next/font/local";
import "./globals.css";
import Providers from "./component/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SANIZ | AI Photo Generation Platform",
  description: "AI Photo Generation Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-violet-100 to-violet-100`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
