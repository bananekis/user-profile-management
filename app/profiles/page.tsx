import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import ProfileList from "@/components/ProfileList";

export default async function Profiles() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/auth/signin");
	}

	const profiles = await prisma.profile.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			userId: true,
		},
	});

	return (
		<Layout>
			<h1 className="text-3xl font-bold mb-4">All Profiles</h1>
			<ProfileList profiles={profiles} />
		</Layout>
	);
}
