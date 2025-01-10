import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import Layout from "@/components/Layout";
import SignInForm from "../../../components/forms/SignInForm";
import { authOptions } from "@/lib/auth";

export default async function SignIn() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-4">Sign In</h1>
			<SignInForm />
		</Layout>
	);
}
