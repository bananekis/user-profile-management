"use client";

import { useRouter } from "next/navigation";
import { ProfileFormData } from "@/types";
import ProfileFormBase from "@/components/ProfileFormBase";
import { handleProfileSubmit } from "@/utils/profileSubmit";

interface ProfileFormProps {
	initialData: ProfileFormData;
}

export default function EditProfileForm({ initialData }: ProfileFormProps) {
	const router = useRouter();

	const onSubmit = async (data: ProfileFormData) => {
		await handleProfileSubmit("update", router, data, initialData.id);
	};

	return (
		<ProfileFormBase
			initialData={initialData}
			onSubmit={onSubmit}
			submitButtonText="Update Profile"
		/>
	);
}
