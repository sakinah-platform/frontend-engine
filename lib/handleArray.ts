import { useCallback } from "react";

export type ArrayVisibility = Record<string, boolean | Record<string, boolean>>;
const useShowArray = () => {
	const openArray = useCallback(
		(
			setModalFunc: React.Dispatch<React.SetStateAction<ArrayVisibility>>,
			itemId: number
		) => {
			setModalFunc((prevVisibility) => ({
				...prevVisibility,
				[itemId]: true,
			}));
		},
		[]
	);

	const closeArray = useCallback(
		(
			setModalFunc: React.Dispatch<React.SetStateAction<ArrayVisibility>>,
			itemId: number
		) => {
			setModalFunc((prevVisibility) => ({
				...prevVisibility,
				[itemId]: false,
			}));
		},
		[]
	);

	const openArrayinArray = useCallback(
		(
			setModalFunc: React.Dispatch<React.SetStateAction<ArrayVisibility>>,
			parentId: number,
			childId: number
		) => {
			setModalFunc((prevVisibility) => ({
				...prevVisibility,
				[parentId]: {
					...((prevVisibility[parentId] as Record<string, boolean>) || {}),
					[childId]: true,
				},
			}));
		},
		[]
	);

	const closeArrayinArray = useCallback(
		(
			setModalFunc: React.Dispatch<React.SetStateAction<ArrayVisibility>>,
			parentId: number,
			childId: number
		) => {
			setModalFunc((prevVisibility) => ({
				...prevVisibility,
				[parentId]: {
					...((prevVisibility[parentId] as Record<string, boolean>) || {}),
					[childId]: false,
				},
			}));
		},
		[]
	);

	return { openArray, openArrayinArray, closeArray, closeArrayinArray };
};

const initializeArrayVisibility = (
	data: Array<{ id: string }>
): ArrayVisibility => {
	const initialArrayVisibility: ArrayVisibility = {};
	data.forEach((item) => {
		initialArrayVisibility[item.id] = false;
	});
	return initialArrayVisibility;
};

const initializeArrayVisibilityinArray = (
	data: Array<{ [key: string]: Array<{ id: string }> }>,
	child: number
) => {
	const initialArrayVisibility: ArrayVisibility = {};
	data.forEach((item) => {
		item[child].forEach((items) => {
			initialArrayVisibility[items.id] = false;
		});
	});
	return initialArrayVisibility;
};

const initializeButtonNavActive = (
	data: unknown[]
): Record<number, boolean> => {
	const initialButtonActive: Record<number, boolean> = {};
	data.forEach((item, i) => {
		initialButtonActive[i] = false;
	});
	initialButtonActive[0] = true;
	// initialButtonActive[1] = true;
	return initialButtonActive;
};

export {
	initializeArrayVisibility,
	initializeArrayVisibilityinArray,
	initializeButtonNavActive,
	useShowArray,
};
