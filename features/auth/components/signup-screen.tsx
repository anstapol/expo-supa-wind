import { Link } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	Text,
	TextInput,
	View,
} from "react-native";
import { useAuthActions } from "../store";

export function SignupScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { signUp } = useAuthActions();
	const [validationError, setValidationError] = useState<string | null>(null);

	async function handleSubmit() {
		setValidationError(null);
		setError(null);

		if (password.length < 8) {
			setValidationError("Password must be at least 8 characters");
			return;
		}
		if (password !== confirmPassword) {
			setValidationError("Passwords don't match");
			return;
		}

		setIsLoading(true);
		try {
			await signUp({ email: email.trim(), password, confirmPassword });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Sign up failed");
		} finally {
			setIsLoading(false);
		}
	}

	const displayError = validationError ?? error;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-background"
		>
			<View className="flex-1 justify-center px-8">
				<Text className="mb-8 text-center text-3xl font-bold text-foreground">
					Create account
				</Text>

				{displayError && (
					<Text className="mb-4 text-center text-destructive">
						{displayError}
					</Text>
				)}

				<TextInput
					className="mb-4 rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground"
					placeholder="Email"
					placeholderTextColor="hsl(var(--muted-foreground))"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
					autoComplete="email"
				/>

				<TextInput
					className="mb-4 rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground"
					placeholder="Password"
					placeholderTextColor="hsl(var(--muted-foreground))"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoComplete="new-password"
				/>

				<TextInput
					className="mb-6 rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground"
					placeholder="Confirm password"
					placeholderTextColor="hsl(var(--muted-foreground))"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					autoComplete="new-password"
				/>

				<Pressable
					className="mb-4 items-center rounded-lg bg-primary py-3 active:opacity-80"
					onPress={handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color="white" />
					) : (
						<Text className="text-base font-semibold text-primary-foreground">
							Sign up
						</Text>
					)}
				</Pressable>

				<Link href="/login" asChild>
					<Pressable className="items-center py-2">
						<Text className="text-base text-primary">
							Already have an account? Sign in
						</Text>
					</Pressable>
				</Link>
			</View>
		</KeyboardAvoidingView>
	);
}
