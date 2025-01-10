"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ProfileFormData } from "@/types";

export async function updateProfile(id: string, data: ProfileFormData) {
	try {
		await prisma.profile.update({
			where: { id },
			data: {
				firstName: data.firstName,
				lastName: data.lastName,
				dateOfBirth: new Date(data.dateOfBirth),
				photo: data.photo,
				description: data.description,
			},
		});
		revalidatePath("/profiles");
		revalidatePath(`/profile/${id}`);
		return { success: true };
	} catch (error) {
		console.error("Error updating profile:", error);
		return { success: false, error: "Failed to update profile" };
	}
}
