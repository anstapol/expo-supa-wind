import { z } from "zod/v4";

export const signInSchema = z.object({
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
