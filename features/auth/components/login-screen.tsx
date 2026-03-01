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

export function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { signIn } = useAuthActions();

	async function handleSubmit() {
		setError(null);
		setIsLoading(true);
		try {
			await signIn({ email: email.trim(), password });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Sign in failed");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1 bg-background"
		>
			<View className="flex-1 justify-center px-8">
				<Text className="mb-8 text-center text-3xl font-bold text-foreground">
					Welcome back
				</Text>

				{error && (
					<Text className="mb-4 text-center text-destructive">{error}</Text>
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
					className="mb-6 rounded-lg border border-input bg-card px-4 py-3 text-base text-foreground"
					placeholder="Password"
					placeholderTextColor="hsl(var(--muted-foreground))"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoComplete="password"
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
							Sign in
						</Text>
					)}
				</Pressable>

				<Link href="/signup" asChild>
					<Pressable className="items-center py-2">
						<Text className="text-base text-primary">
							Don't have an account? Sign up
						</Text>
					</Pressable>
				</Link>
			</View>
		</KeyboardAvoidingView>
	);
}
