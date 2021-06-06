import { useCallback, useEffect, useState } from 'react';

interface IInitItem {
  isDefaultChecked?: boolean;
}

interface IChecklist<T> {
  initList: T[];
  idKey?: keyof T;
}

type IKeyId = string | number;

type IChecklistDict<T> = Record<string | number, { value: T; checked: boolean }>;

const useChecklist = <T extends IInitItem>({ initList = [], idKey }: IChecklist<T>) => {
  const [dict, setDict] = useState<IChecklistDict<T>>({});

  const [checkedItems, setCheckedItems] = useState<T[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const initChecklist = useCallback(
    (list: T[]) => {
      const initDict = list.reduce<IChecklistDict<T>>((acc, item, index) => {
        const key: IKeyId = idKey ? (item[idKey] as unknown as IKeyId) : index;
        return {
          ...acc,
          [key]: {
            value: item,
            checked: !!item.isDefaultChecked
          }
        };
      }, {});
      setDict(initDict);
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

  const toggleCheck = useCallback((id: IKeyId, state?: boolean) => {
    setDict((prevDict) => ({
      ...prevDict,
      [id]: {
        ...prevDict[id],
        checked: state ?? !prevDict[id].checked
      }
    }));
  }, []);

  const toggleAll = useCallback(
    (state?: boolean) => {
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

  const isChecked = useCallback((id: IKeyId): boolean => dict[id]?.checked, [dict]);

  return {
    checkedItems,
    allChecked,
    isChecked,
    toggleCheck,
    toggleAll
  };
};

export default useChecklist;
