import { useCallback, useEffect, useState } from 'react';

const useChecklist = ({ initList = [], idKey = '' }) => {
	/* dict: { [id]: { value: any, checked: boolean } } */
	const [dict, setDict] = useState({});

	const [checkedItems, setCheckedItems] = useState([]);
	const [allChecked, setAllChecked] = useState(false);

	const initChecklist = useCallback(
		(list) => {
			setDict(
				list.reduce((acc, item, index) => {
					const key = idKey ? item[idKey] : index;
					return {
						...acc,
						[key]: {
							value: item,
							checked: !!item.checked
						}
					};
				}, {})
			);
		},
		[idKey]
	);

	useEffect(() => {
		initChecklist(initList);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initList]);

	useEffect(() => {
		const newCheckedItems = Object.values(dict)
			.filter((item) => item.checked)
			.map((item) => item.value);

		setCheckedItems(newCheckedItems);
		setAllChecked(newCheckedItems.length === Object.keys(dict).length);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dict]);

	const toggleCheck = useCallback((id, state) => {
		setDict((prevDict) => ({
			...prevDict,
			[id]: {
				...prevDict[id],
				checked: state ?? !prevDict[id].checked
			}
		}));
	}, []);

	const toggleAll = useCallback(
		(state) => {
			setDict((prevDict) =>
				Object.fromEntries(
					Object.entries(prevDict).map(([key, val]) => [
						key,
						{ ...val, checked: state ?? !allChecked }
					])
				)
			);
		},
		[allChecked]
	);

	const isChecked = useCallback((id) => dict[id]?.checked, [dict]);

	return {
		checkedItems,
		allChecked,
		isChecked,
		toggleCheck,
		toggleAll
	};
};

export default useChecklist;
