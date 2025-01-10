"use server";

import { signIn } from "next-auth/react";

export async function signInAction(email: string, password: string) {
	try {
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			return { success: false, error: result.error };
		}

		if (result?.ok) {
			return { success: true };
		}

		return { success: false, error: "An unexpected error occurred" };
	} catch (error) {
		console.error("Sign in error:", error);
		return { success: false, error: "An unexpected error occurred" };
	}
}
