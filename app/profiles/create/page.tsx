import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import CreateProfileForm from "@/components/forms/CreateProfileForm";
import { authOptions } from "@/lib/auth";

export default async function CreateProfile() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/auth/signin");
	}

	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-4">Create Profile</h1>
			<CreateProfileForm />
		</Layout>
	);
}
