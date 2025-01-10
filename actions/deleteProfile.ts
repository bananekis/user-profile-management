"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function deleteProfile(id: string) {
	try {
		await prisma.profile.delete({
			where: { id },
		});
		revalidatePath("/profiles");
		return { success: true };
	} catch (error) {
		console.error("Error deleting profile:", error);
		return { success: false, error: "Failed to delete profile" };
	}
}
