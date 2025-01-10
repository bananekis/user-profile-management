import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";

import SignOutButton from "./ui/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<Link
								href="/"
								className="flex-shrink-0 flex items-center"
							>
								Home
							</Link>
							{session && (
								<>
									<Link
										href="/profiles"
										className="ml-4 flex items-center"
									>
										All Profiles
									</Link>
									<Link
										href="/profiles/create"
										className="ml-4 flex items-center"
									>
										Create Profile
									</Link>
								</>
							)}
						</div>
						<div className="flex items-center">
							{session ? (
								<>
									<span className="text-gray-700 mr-4">
										{session.user?.name}
									</span>
									<SignOutButton />
								</>
							) : (
								<>
									<Link
										href="/auth/signin"
										className="text-gray-700 hover:text-gray-900 mx-4"
									>
										Sign in
									</Link>
									<Link
										href="/auth/signup"
										className="text-gray-700 hover:text-gray-900"
									>
										Sign up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}
