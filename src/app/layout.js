import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Next-Media",
  description:
    "A Media site for all things combat sports, or whatever you want really",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar></NavBar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
