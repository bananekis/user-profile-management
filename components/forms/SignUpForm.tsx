"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/actions/register";
import toast from "react-hot-toast";
import { SignUpFormData } from "@/types";

export default function SignUpForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>();

	const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
		const result = await registerUser(data);

		if (result.success) {
			toast.success("Sign up successful! Redirecting to sign in page...");
			setTimeout(() => {
				router.push("/auth/signin");
			}, 2000);
		} else {
			toast.error(
				result.error || "An error occurred during registration."
			);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label htmlFor="name" className="form-label">
					Name
				</label>
				<input
					type="text"
					id="name"
					{...register("name", { required: "Name is required" })}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
				/>
				{errors.name && (
					<p className="text-red-500 text-xs mt-1">
						{errors.name.message}
					</p>
				)}
			</div>
			<div>
				<label htmlFor="email" className="form-label">
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
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="password"
					id="password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
				/>
				{errors.password && (
					<p className="text-red-500 text-xs mt-1">
						{errors.password.message}
					</p>
				)}
			</div>
			<button type="submit" className="btn-primary">
				Sign Up
			</button>
		</form>
	);
}
