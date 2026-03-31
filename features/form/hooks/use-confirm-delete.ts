import { Alert, Platform } from "react-native";

type ConfirmDeleteOptions = {
	title: string;
	message: string;
	onConfirm: () => void;
};

export function useConfirmDelete() {
	return ({ title, message, onConfirm }: ConfirmDeleteOptions) => {
		if (Platform.OS === "web") {
			if (window.confirm(`${title}\n\n${message}`)) {
				onConfirm();
			}
			return;
		}

		Alert.alert(title, message, [
			{ text: "Cancel", style: "cancel" },
			{ text: "Delete", style: "destructive", onPress: onConfirm },
		]);
	};
}
