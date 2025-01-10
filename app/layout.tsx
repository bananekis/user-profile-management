import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "User Profile Management",
	description: "CRUD application for managing user profiles",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
