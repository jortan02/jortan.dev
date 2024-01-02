import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "jortan.dev",
        template: "%s | jortan.dev",
    },
    description: "Computer science student at the University of Utah",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen flex flex-col justify-start`}>
                <Navigation />
                {children}
                <Footer />
            </body>
        </html>
    );
}
