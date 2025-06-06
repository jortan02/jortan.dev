import type { Metadata } from "next";
import type { Viewport } from "next";
import { monoFont } from "@/styles/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ChatToggle } from "@/components/ChatToggle";

import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "jortan.dev",
		template: "%s | jortan.dev",
	},
	description:
		"Software developer and ML engineer with full-stack experience and a focus on building practical AI systems.",
};

export const viewport: Viewport = {
	themeColor: "black",
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${monoFont.className}`}>
				{children}
				<ChatToggle />
			</body>
			<SpeedInsights />
			<Analytics />
		</html>
	);
}
