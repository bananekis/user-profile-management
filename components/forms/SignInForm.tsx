"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { SignInFormData } from "@/types";

export default function SignInForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
		setIsLoading(true);
		try {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				toast.error(result.error);
			} else {
				toast.success("Sign in successful! Redirecting...");
				setTimeout(() => {
					router.push("/");
				}, 2000);
			}
		} catch (error) {
			console.error("Sign in error:", error);
			toast.error("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message:
								"Entered value does not match email format",
						},
					})}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
				/>
				{errors.email && (
					<p className="text-red-500 text-xs mt-1">
						{errors.email.message}
					</p>
				)}
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					{...register("password", {
						required: "Password is required",
					})}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
				/>
				{errors.password && (
					<p className="text-red-500 text-xs mt-1">
						{errors.password.message}
					</p>
				)}
			</div>
			<button
				type="submit"
				disabled={isLoading}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
			>
				{isLoading ? "Signing In..." : "Sign In"}
			</button>
		</form>
	);
}
