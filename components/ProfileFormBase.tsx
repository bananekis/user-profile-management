"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import RichTextEditor from "@/components/RichTextEditor";
import { FormField, ProfileFormData } from "@/types";

const formFields: FormField[] = [
	{ name: "firstName", label: "First Name", type: "text", required: true },
	{ name: "lastName", label: "Last Name", type: "text", required: true },
	{
		name: "dateOfBirth",
		label: "Date of Birth",
		type: "date",
		required: true,
	},
	{ name: "photo", label: "Photo URL", type: "text", required: false },
	{
		name: "description",
		label: "Description",
		type: "rich-text",
		required: true,
	},
];

interface ProfileFormBaseProps {
	initialData?: ProfileFormData;
	onSubmit: (data: ProfileFormData) => Promise<void>;
	submitButtonText: string;
}

export default function ProfileFormBase({
	initialData,
	onSubmit,
	submitButtonText,
}: ProfileFormBaseProps) {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProfileFormData>({
		//@ts-expect-error dateofbirth is needs to be a string
		defaultValues: initialData
			? {
					...initialData,
					dateOfBirth: initialData.dateOfBirth
						? initialData.dateOfBirth.toISOString().split("T")[0]
						: undefined,
			  }
			: undefined,
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleFormSubmit: SubmitHandler<ProfileFormData> = async (data) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{formFields.map((field) => (
				<div key={field.name}>
					<label htmlFor={field.name} className="form-label">
						{field.label}
					</label>
					{field.type === "rich-text" ? (
						<Controller
							name="description"
							control={control}
							rules={{ required: "Description is required" }}
							render={({ field }) => (
								<RichTextEditor
									content={field.value || ""}
									onChange={field.onChange}
								/>
							)}
						/>
					) : (
						<input
							type={field.type}
							id={field.name}
							{...register(field.name, {
								required: field.required
									? `${field.label} is required`
									: false,
							})}
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					)}
					{errors[field.name] && (
						<p className="text-red-500 text-xs mt-1">
							{errors[field.name]?.message}
						</p>
					)}
				</div>
			))}
			<button type="submit" disabled={isLoading} className="btn-primary">
				{isLoading ? "Submitting..." : submitButtonText}
			</button>
		</form>
	);
}
