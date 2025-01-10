import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import EditProfileForm from "@/components/forms/EditProfileForm";
import { authOptions } from "@/lib/auth";

export default async function Profile({ params }: { params: { id: string } }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/auth/signin");
	}

	const profile = await prisma.profile.findUnique({
		where: { id: params.id },
	});

	if (!profile) {
		return (
			<Layout>
				<h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
				<p>The requested profile does not exist.</p>
			</Layout>
		);
	}

	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
			<EditProfileForm initialData={profile} />
		</Layout>
	);
}
