import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { authOptions } from "@/lib/auth";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Layout>
			<h1 className="text-3xl font-bold">
				Welcome to User Profile Management
			</h1>
			{session ? (
				<p className="mt-4">
					You are signed in as {session.user?.name}
				</p>
			) : (
				<p className="mt-4">Please sign in to manage profiles</p>
			)}
		</Layout>
	);
}
