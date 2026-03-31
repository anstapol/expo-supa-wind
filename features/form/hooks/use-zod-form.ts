import { zodResolver } from "@hookform/resolvers/zod";
import {
	type FieldValues,
	type Resolver,
	type UseFormProps,
	useForm,
} from "react-hook-form";
import type { z } from "zod/v4";

export function useZodForm<TFieldValues extends FieldValues>(
	// biome-ignore lint/suspicious/noExplicitAny: Zod v4 ZodType needs explicit type params
	schema: z.ZodType<TFieldValues, any>,
	props?: Omit<UseFormProps<TFieldValues>, "resolver">,
) {
	return useForm<TFieldValues>({
		...props,
		// biome-ignore lint/suspicious/noExplicitAny: resolver types target Zod v3 but runtime works with v4
		resolver: zodResolver(schema as any, undefined, {
			raw: true,
		}) as unknown as Resolver<TFieldValues>,
	});
}
