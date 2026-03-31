import { createContext, useContext, useId } from "react";
import { View, type ViewProps } from "react-native";
import { cn } from "~/features/ui/utils";
import type { FormItemContextValue } from "../types";

const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormItemId() {
	const ctx = useContext(FormItemContext);
	return ctx?.id;
}

export function FormItem({ className, ...props }: ViewProps) {
	const id = useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<View className={cn("gap-1.5", className)} {...props} />
		</FormItemContext.Provider>
	);
}
