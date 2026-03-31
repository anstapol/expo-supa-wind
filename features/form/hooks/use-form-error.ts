import { useState } from "react";

export function useFormError() {
	const [error, setError] = useState<string | null>(null);

	function handleError(e: unknown, fallback: string) {
		setError(e instanceof Error ? e.message : fallback);
	}

	function clearError() {
		setError(null);
	}

	return { error, handleError, clearError } as const;
}
