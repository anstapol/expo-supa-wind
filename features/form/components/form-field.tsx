import { createContext, useContext } from "react";
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import type { FormFieldContextValue } from "../types";

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
	const ctx = useContext(FormFieldContext);
	if (!ctx) {
		throw new Error("useFormField must be used within <FormField>");
	}
	return ctx;
}

export function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
}

export { FormFieldContext };
