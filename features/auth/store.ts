import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "~/features/infra/supabase";
import type { LoginInput, SignupInput } from "./types";

type AuthState = {
	session: Session | null;
	user: User | null;
	isLoading: boolean;
};

type AuthActions = {
	initialize: () => () => void;
	signIn: (input: LoginInput) => Promise<void>;
	signUp: (input: SignupInput) => Promise<void>;
	signOut: () => Promise<void>;
};

type AuthStore = AuthState & { actions: AuthActions };

export const useAuthStore = create<AuthStore>((set) => ({
	session: null,
	user: null,
	isLoading: true,

	actions: {
		initialize: () => {
			supabase.auth.getSession().then(({ data: { session } }) => {
				set({ session, user: session?.user ?? null, isLoading: false });
			});

			const {
				data: { subscription },
			} = supabase.auth.onAuthStateChange((_event, session) => {
				set({ session, user: session?.user ?? null });
			});

			return () => subscription.unsubscribe();
		},

		signIn: async ({ email, password }: LoginInput) => {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
		},

		signUp: async ({ email, password }: SignupInput) => {
			const { error } = await supabase.auth.signUp({ email, password });
			if (error) throw error;
		},

		signOut: async () => {
			await supabase.auth.signOut();
		},
	},
}));

export const useAuthActions = () => useAuthStore((s) => s.actions);
export const useSession = () => useAuthStore((s) => s.session);
export const useUser = () => useAuthStore((s) => s.user);
export const useAuthLoading = () => useAuthStore((s) => s.isLoading);
