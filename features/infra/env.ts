import { z } from "zod/v4";

const envSchema = z.object({
	EXPO_PUBLIC_SUPABASE_URL: z.url(),
	EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;

export type Env = z.infer<typeof envSchema>;
