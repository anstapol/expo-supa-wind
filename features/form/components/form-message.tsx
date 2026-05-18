import { useFormContext } from "react-hook-form";
import { Text } from "~/features/ui";
import { useFormField } from "./form-field";

export function FormMessage() {
	const { name } = useFormField();
	const { getFieldState, formState } = useFormContext();
	const { error } = getFieldState(name, formState);

	if (!error?.message) {
		return null;
	}

	return <Text className="text-sm text-destructive">{error.message}</Text>;
}
