type DataItem = Record<string, any>;

export default function dataSelect(
	data: DataItem[],
	key1: string = "id",
	key2: string = "title",
	alt1: string = "title"
) {
	const dataArray = data.map((item) => ({
		value: item[key1],
		label: key2.includes(".")
			? getObjectValue(item, key2) || getObjectValue(item, alt1)
			: item[key2] || item[alt1],
	}));

	dataArray.sort((a, b) => {
		const labelA = a?.label?.toLowerCase() || "";
		const labelB = b?.label?.toLowerCase() || "";
		if (labelA < labelB) return -1;
		if (labelA > labelB) return 1;
		return 0;
	});
	return dataArray;
}

function getObjectValue(obj: Record<string, any>, path: string): any {
	const keys = path.split(".");
	let value: any = obj;
	for (const key of keys) {
		value = value?.[key]; // Use optional chaining to handle undefined keys
		if (value === undefined) {
			return undefined;
		}
	}
	return value;
}

export { getObjectValue };
