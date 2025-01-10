"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignUpFormData } from "@/types";

export async function registerUser(data: SignUpFormData) {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			return {
				success: false,
				error: "User with this email already exists",
			};
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		});

		revalidatePath("/auth/signin");
		return { success: true };
	} catch (error) {
		console.error("Registration error:", error);
		return {
			success: false,
			error: JSON.stringify(error),
		};
	}
}
