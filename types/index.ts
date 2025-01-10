export interface Profile {
	id: string;
	firstName: string;
	lastName: string;
	userId: string;
}

export interface ProfileFormData {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	photo: string | null;
	description: string;
	userId: string;
}

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

export interface SignInFormData {
	email: string;
	password: string;
}

export interface FormField {
	name: keyof ProfileFormData;
	label: string;
	type: string;
	required?: boolean;
}
