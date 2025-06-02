import { Inter, JetBrains_Mono } from "next/font/google";

export const monoFont = JetBrains_Mono({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["monospace"],
});

export const sansSerifFont = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["sans-serif"],
});
