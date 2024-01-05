import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.scss";

const font = JetBrains_Mono({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

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
            <body className={`${font.className}`}>{children}</body>
            <SpeedInsights />
        </html>
    );
}
