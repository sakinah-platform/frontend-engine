import { Dispatch, SetStateAction, useCallback } from "react";

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

const useShowNav = () => {
	const navigateToTab = (
		setFunc: Dispatch<SetStateAction<Record<number, boolean>>>,
		index: number
	) => {
		nonActiveButtonNav(setFunc, index);
		activeButtonNav(setFunc, index);
		// setShowNav(false);
	};
	const activeButtonNav = useCallback(
		(
			setButton: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
			navIndex: number
		) => {
			setButton((prevVisibility) => ({
				...prevVisibility,
				[navIndex]: true,
			}));
		},
		[]
	);

	const nonActiveButtonNav = useCallback(
		(
			setButton: React.Dispatch<React.SetStateAction<Record<number, boolean>>>,
			navIndex: number
		) => {
			setButton((prevVisibility) =>
				Object.fromEntries(
					Object.keys(prevVisibility).map((key) => [
						Number(key),
						Number(key) === navIndex ? true : false,
					])
				)
			);
		},
		[]
	);

	return { navigateToTab, activeButtonNav, nonActiveButtonNav };
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
	useShowNav,
};
