import { createProfile } from "@/actions/createProfile";
import { updateProfile } from "@/actions/updateProfile";
import { deleteProfile } from "@/actions/deleteProfile";
import { ProfileFormData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-hot-toast";

type ProfileAction = "create" | "update" | "delete";

export const handleProfileSubmit = async (
	action: ProfileAction,
	router: AppRouterInstance,
	data?: ProfileFormData,
	id?: string
) => {
	try {
		if (
			action === "delete" &&
			!confirm("Are you sure you want to delete this profile?")
		) {
			return;
		}

		let result;

		switch (action) {
			case "create":
				result = await createProfile(data!);
				break;
			case "update":
				result = await updateProfile(id!, data!);
				break;
			case "delete":
				result = await deleteProfile(id!);
				break;
		}

		if (result.success) {
			toast.success(`Profile ${action}d successfully`);
			router.push("/profiles");
		} else {
			toast.error(result.error || `Failed to ${action} profile`);
		}
	} catch (error) {
		console.error(`Error ${action}ing profile:`, error);
		toast.error("An unexpected error occurred. Please try again.");
	}
};
