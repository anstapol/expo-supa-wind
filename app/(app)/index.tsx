import { Pressable, Text, View } from "react-native";
import { useAuthActions, useUser } from "~/features/auth";

export default function Home() {
	const user = useUser();
	const { signOut } = useAuthActions();

	return (
		<View className="flex-1 items-center justify-center bg-background px-8">
			<Text className="mb-2 text-2xl font-bold text-foreground">Home</Text>
			<Text className="mb-8 text-muted">{user?.email}</Text>
			<Pressable
				className="rounded-lg bg-danger px-6 py-3 active:bg-danger/80"
				onPress={signOut}
			>
				<Text className="font-semibold text-white">Sign out</Text>
			</Pressable>
		</View>
	);
}
