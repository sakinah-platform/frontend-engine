import axios, { AxiosResponse } from "axios";
// import { errorAxiosHandling } from "./crudGeneral";

const getUrlString = (params?: {
	method: string;
	basePath?: string | number; // Optional base path
	queryParams?: Record<string, string | number | undefined>; // Query parameters
}) => {
	const { method, basePath, queryParams } = params || {};

	// Construct query parameters dynamically
	const queryString = queryParams
		? new URLSearchParams(
				Object.entries(queryParams).reduce((acc, [key, value]) => {
					if (value !== undefined) acc[key] = value.toString();
					return acc;
				}, {} as Record<string, string>)
		  ).toString()
		: "";

	// Construct the final URL
	const url = `${process.env.sakinahAPI}/master_data/${method}${
		basePath ? `/${basePath}` : ""
	}${queryString ? `?${queryString}` : ""}`;
	return url;
};

export const apiCall = async <T>(
	// start: () => Action = () => ({ type: "START" }),
	route: string
	// failure: (error: string) => Action = (error: string) => ({
	// 	type: "FAILURE",
	// 	payload: error,
	// })
): Promise<T | void> => {
	// if (start) {
	// 	// dispatch(start());
	// }

	try {
		const response: AxiosResponse<T> = await axios.get(
			getUrlString({ method: route })
		);
		if (response.status !== 200) {
			throw new Error("Failed to fetch data");
		}

		// const responseData = await response.data;
		const responseData = response.data as { results: T }; // Explicitly cast response data

		return responseData.results;
	} catch (error) {
		// if (failure) {
		if (axios.isAxiosError(error)) {
			console.error("Axios Error:", error.message);
		} else {
			console.error("Unexpected Error:", error);
		}

		// 	// dispatch(failure(errorAxiosHandling(error)));
		// 	throw failure;
		// }
	}
};
