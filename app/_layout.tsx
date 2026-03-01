import "../features/ui/global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useAuthActions, useAuthLoading, useSession } from "~/features/auth";
import { ThemeInitializer } from "~/features/theme";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
	const session = useSession();
	const isLoading = useAuthLoading();
	const { initialize } = useAuthActions();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = initialize();
		return unsubscribe;
	}, [initialize]);

	useEffect(() => {
		if (isLoading) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (!session && !inAuthGroup) {
			router.replace("/login");
		} else if (session && inAuthGroup) {
			router.replace("/");
		}

		SplashScreen.hideAsync();
	}, [session, isLoading, segments, router]);

	if (isLoading) return null;

	return <Slot />;
}

export default function RootLayout() {
	return (
		<>
			<ThemeInitializer />
			<RootNavigator />
		</>
	);
}
