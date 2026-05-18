import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { useThemeActions } from "../store";

export function ThemeInitializer() {
	const { setColorScheme } = useColorScheme();
	const { initialize } = useThemeActions();

	useEffect(() => {
		initialize(setColorScheme);
	}, [initialize, setColorScheme]);

	return null;
}
