import { Analytics } from "@vercel/analytics/next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={`${workSans.variable} antialiased`}>{children}</body>
			<Analytics />
		</html>
	);
}
