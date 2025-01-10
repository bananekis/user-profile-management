"use client";

import Link from "next/link";
import { Profile } from "@/types";
import { handleProfileSubmit } from "@/utils/profileSubmit";
import { useRouter } from "next/navigation";

interface ProfileListProps {
	profiles: Profile[];
}

export default function ProfileList({ profiles }: ProfileListProps) {
	const router = useRouter();
	const handleDelete = async (id: string) => {
		await handleProfileSubmit("delete", router, undefined, id);
	};

	if (!profiles || profiles.length === 0) {
		return <p>No profiles found.</p>;
	}

	return (
		<div className="grid gap-4">
			{profiles.map((profile) => (
				<div key={profile.id} className="border p-4 rounded">
					<h2 className="text-xl font-semibold">
						{profile.firstName} {profile.lastName}
					</h2>
					<div className="mt-2 space-x-2">
						<Link
							href={`/profiles/${profile.id}`}
							className="text-blue-500 hover:underline"
						>
							View/Edit
						</Link>
						<button
							onClick={() => handleDelete(profile.id)}
							className="text-red-500 hover:underline"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
