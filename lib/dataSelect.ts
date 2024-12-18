type DataItem = Record<string, unknown>;

export default function dataSelect(
	data: DataItem[],
	key1: string = "id",
	key2: string = "title",
	alt1: string = "name"
): { value: unknown; label: string }[] {
	const dataArray = data.map((item) => ({
		value: item[key1],
		label: key2.includes(".")
			? (getObjectValue(item, key2) as string) ||
			  (getObjectValue(item, alt1) as string)
			: (item[key2] as string) || (item[alt1] as string),
	}));

	return sortData(dataArray);
}
export function dataDropdown(
	data: DataItem[],
	key1: string = "id",
	key2: string = "title",
	alt1: string = "name"
): { id: unknown; label: string }[] {
	const dataArray = data.map((item) => ({
		id: item[key1],
		label: key2.includes(".")
			? (getObjectValue(item, key2) as string) ||
			  (getObjectValue(item, alt1) as string)
			: (item[key2] as string) || (item[alt1] as string),
	}));

	return sortData(dataArray);
}

function getObjectValue(obj: DataItem, path: string): unknown {
	const keys = path.split(".");
	let value: unknown = obj;
	for (const key of keys) {
		value = (value as Record<string, unknown>)?.[key]; // Use optional chaining to handle undefined keys
		if (value === undefined) {
			return undefined;
		}
	}
	return value;
}

function sortData<T extends { label: string }>(data: T[]): T[] {
	data.sort((a, b) => {
		const labelA = a?.label?.toLowerCase() || "";
		const labelB = b?.label?.toLowerCase() || "";
		if (labelA < labelB) return -1;
		if (labelA > labelB) return 1;
		return 0;
	});
	return data;
}

export { getObjectValue };
