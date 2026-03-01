import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { useAuthActions, useUser } from "~/features/auth";
import { type ThemePreference, useTheme, useThemeActions } from "~/features/theme";

const next: Record<ThemePreference, ThemePreference> = {
	system: "light",
	light: "dark",
	dark: "system",
};

const label: Record<ThemePreference, string> = {
	system: "System",
	light: "Light",
	dark: "Dark",
};

export default function Home() {
	const user = useUser();
	const { signOut } = useAuthActions();
	const preference = useTheme();
	const { setPreference } = useThemeActions();
	const { setColorScheme } = useColorScheme();

	return (
		<View className="flex-1 items-center justify-center bg-background px-8">
			<Text className="mb-2 text-2xl font-bold text-foreground">Home</Text>
			<Text className="mb-8 text-muted">{user?.email}</Text>
			<Pressable
				className="mb-4 rounded-lg bg-surface px-6 py-3 active:bg-surface/80"
				onPress={() => setPreference(next[preference], setColorScheme)}
			>
				<Text className="font-semibold text-foreground">
					Theme: {label[preference]}
				</Text>
			</Pressable>
			<Pressable
				className="rounded-lg bg-danger px-6 py-3 active:bg-danger/80"
				onPress={signOut}
			>
				<Text className="font-semibold text-white">Sign out</Text>
			</Pressable>
		</View>
	);
}
