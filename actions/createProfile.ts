"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ProfileFormData } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function createProfile(data: ProfileFormData) {
	const session = await getServerSession(authOptions);

	if (!(session?.user as any).id) {
		return { success: false, error: "User not authenticated" };
	}

	try {
		const existingProfile = await prisma.profile.findUnique({
			where: { userId: (session?.user as any).id },
		});

		if (existingProfile) {
			return {
				success: false,
				error: "Profile already exists for this user",
			};
		}

		const newProfile = await prisma.profile.create({
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				dateOfBirth: new Date(data.dateOfBirth),
				photo: data.photo || null,
				description: data.description,
				userId: (session?.user as any).id,
			},
		});

		revalidatePath("/profiles");
		return { success: true, profileId: newProfile.id };
	} catch (error) {
		console.error("Error creating profile:", error);
		return { success: false, error: "Failed to create profile" };
	}
}
