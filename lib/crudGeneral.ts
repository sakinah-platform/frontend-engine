import axios, { AxiosResponse } from "axios";

type Action<T = unknown> = { type: string; payload?: T };

export const fetchData = async <T>(
	start: () => Action = () => ({ type: "START" }),
	route: string,
	slicer: (data: T) => Action<T> = () => ({ type: "SUCCESS" }),
	failure: (error: string) => Action = (error: string) => ({
		type: "FAILURE",
		payload: error,
	}),
	dispatch: (action: Action) => void = () => null
): Promise<T | void> => {
	if (start) {
		dispatch(start());
	}

	try {
		const response: AxiosResponse<T> = await axios.get(`/api/${route}`);
		if (response.status !== 200) {
			throw new Error("Failed to fetch categories");
		}

		const responseData = await response.data;
		if (slicer) {
			dispatch(slicer(responseData));
		}

		return responseData;
	} catch (error) {
		if (failure) {
			dispatch(failure(errorAxiosHandling(error)));
		}
	}
};

export const postData = async <T>(
	dataForm: Record<string, unknown>, // Use a generic object for form data
	start: () => Action = () => ({ type: "START" }), // Function to handle the start of the request
	route: string, // Endpoint for the POST request
	slicer: (data: T) => Action<T> = () => ({ type: "SUCCESS" }),
	failure: (error: string) => Action = (error: string) => ({
		type: "FAILURE",
		payload: error,
	}), // Function to handle errors
	dispatch: (action: Action) => void = () => null // Function to dispatch actions
): Promise<T | void> => {
	if (start) {
		dispatch(start());
	}
	try {
		const response: AxiosResponse<T> = await axios.post(
			`https://api.example.com/${route}`,
			dataForm
		);

		const responseData = response.data;

		if (slicer) {
			dispatch(slicer(responseData));
		}
		return responseData;
	} catch (error) {
		if (failure) {
			dispatch(failure(errorAxiosHandling(error)));
		}
	}
};

export const errorAxiosHandling = (error: unknown): string => {
	let message: string;
	if (axios.isAxiosError(error)) {
		console.error("Axios error:", error.message);
		message = error.message;
	} else {
		console.error("Unexpected error:", error);
		message = "An unexpected error occurred.";
	}

	return message;
};
