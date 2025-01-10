"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
	return (
		<button
			onClick={() => signOut()}
			className="text-gray-700 hover:text-gray-900"
		>
			Sign out
		</button>
	);
}
