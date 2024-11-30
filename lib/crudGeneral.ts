import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export const fetchData = async (
	start: Function = () => null,
	route: string,
	slicer: Function = () => null,
	failure: Function = () => null
) => {
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
	dataForm: any,
	start: Function = () => null,
	route: string,
	slicer: Function = () => null,
	failure: Function = () => null
) => {
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
