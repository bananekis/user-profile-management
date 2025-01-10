import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import SignUpForm from "../../../components/forms/SignUpForm";
import { authOptions } from "@/lib/auth";

export default async function SignUp() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-4">Sign Up</h1>
			<SignUpForm />
		</Layout>
	);
}