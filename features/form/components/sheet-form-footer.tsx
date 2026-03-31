import { ArrowLeft, Check, X } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/features/ui";

type SheetFormFooterProps = {
	onSubmit: () => void;
	onBack?: () => void;
	onClose?: () => void;
	loading?: boolean;
	submitDisabled?: boolean;
};

export function SheetFormFooter({
	onSubmit,
	onBack,
	onClose,
	loading,
	submitDisabled,
}: SheetFormFooterProps) {
	const { bottom } = useSafeAreaInsets();
	return (
		<View
			className="flex-row items-center gap-3 border-t border-border bg-card px-6 pt-4"
			style={{ paddingBottom: Math.max(bottom, 16) }}
		>
			{onBack && (
				<Button
					variant="outline"
					onPress={onBack}
					disabled={loading}
					className="w-12"
					iconLeft={ArrowLeft}
				/>
			)}
			<View className="flex-1" />
			<Button
				onPress={onSubmit}
				loading={loading}
				disabled={submitDisabled}
				className="w-12"
				iconLeft={Check}
			/>
			{onClose && (
				<Button
					variant="outline"
					onPress={onClose}
					disabled={loading}
					className="w-12"
					iconLeft={X}
				/>
			)}
		</View>
	);
}
