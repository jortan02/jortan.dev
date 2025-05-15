import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

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
    description: "Software developer and ML engineer with full-stack experience and a focus on building practical AI systems.",
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
            <Analytics />
        </html>
    );
}
