import { Pressable, Text, View } from "react-native";
import { useAuthActions, useUser } from "~/features/auth";

export default function Home() {
	const user = useUser();
	const { signOut } = useAuthActions();

	return (
		<View className="flex-1 items-center justify-center px-8">
			<Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
				Home
			</Text>
			<Text className="mb-8 text-gray-500">{user?.email}</Text>
			<Pressable
				className="rounded-lg bg-red-600 px-6 py-3 active:bg-red-700"
				onPress={signOut}
			>
				<Text className="font-semibold text-white">Sign out</Text>
			</Pressable>
		</View>
	);
}
