import { useEffect, useState } from "react";
import type { TextInputProps } from "react-native";
import { Input } from "~/features/ui";

type NumberInputProps = Omit<TextInputProps, "value" | "onChangeText"> & {
	value: number | null | undefined;
	onValueChange: (value: number | null) => void;
	allowNull?: boolean;
};

export function NumberInput({
	value,
	onValueChange,
	allowNull = false,
	...props
}: NumberInputProps) {
	const [text, setText] = useState(() => (value != null ? String(value) : ""));

	useEffect(() => {
		setText(value != null ? String(value) : "");
	}, [value]);

	function handleChangeText(t: string) {
		const cleaned = t.replace(/[^0-9.]/g, "");
		setText(cleaned);

		if (cleaned === "") {
			onValueChange(allowNull ? null : 0);
			return;
		}

		const num = Number(cleaned);
		if (!Number.isNaN(num)) {
			onValueChange(num);
		}
	}

	function handleBlur() {
		setText(value != null ? String(value) : "");
		props.onBlur?.(null as never);
	}

	return (
		<Input
			{...props}
			value={text}
			onChangeText={handleChangeText}
			onBlur={handleBlur}
			keyboardType={props.keyboardType ?? "decimal-pad"}
		/>
	);
}
