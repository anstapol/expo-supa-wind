import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "~/features/ui";
import { cn } from "~/features/ui/utils";
import { useFormField } from "./form-field";

export function FormLabel({
	className,
	...props
}: ComponentProps<typeof Label>) {
	const { name } = useFormField();
	const { getFieldState, formState } = useFormContext();
	const { error } = getFieldState(name, formState);

	return (
		<Label className={cn(error && "text-destructive", className)} {...props} />
	);
}
