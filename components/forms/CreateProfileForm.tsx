"use client";

import { useRouter } from "next/navigation";
import { ProfileFormData } from "@/types";
import ProfileFormBase from "@/components/ProfileFormBase";
import { handleProfileSubmit } from "@/utils/profileSubmit";

export default function CreateProfileForm() {
	const router = useRouter();

	const onSubmit = async (data: ProfileFormData) => {
		await handleProfileSubmit("create", router, data);
	};

	return (
		<ProfileFormBase
			onSubmit={onSubmit}
			submitButtonText="Create Profile"
		/>
	);
}
