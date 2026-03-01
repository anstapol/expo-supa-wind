import type { z } from "zod/v4";
import type { signInSchema, signupSchema } from "./schemas";

export type LoginInput = z.infer<typeof signInSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
