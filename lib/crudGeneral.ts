import axios, { AxiosResponse } from "axios";

export const fetchData = async (
	start: () => void = () => null,
	route: string,
	slicer: (data: any) => any = () => null,
	failure: (error: any) => void = () => null,
	dispatch: (action: any) => void = () => null
): Promise<void> => {
	if (start) {
		dispatch(start());
	}

	try {
		const response: AxiosResponse = await axios.get(`/api/${route}`);
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

export const postData = async (
	dataForm: Record<string, any>, // Use a generic object for form data
	start: () => void = () => null, // Function to handle the start of the request
	route: string, // Endpoint for the POST request
	slicer: (data: any) => any = () => null, // Function to process the response data
	failure: (error: any) => void = () => null, // Function to handle errors
	dispatch: (action: any) => void = () => null // Function to dispatch actions
): Promise<void> => {
	if (start) {
		dispatch(start());
	}
	try {
		const response: AxiosResponse = await axios.post(
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

export const errorAxiosHandling = (error: any): string => {
	let message;
	if (axios.isAxiosError(error)) {
		console.error("Axios error:", error.message);
		message = error.message;
	} else {
		console.error("General error:", error.message);
		message = error.message;
	}

	return message;
};
