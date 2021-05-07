import { useState, useEffect, useRef, useCallback } from 'react';

const usePromise = ({ defaultFn, reloadFn, fetchingFirst } = {}) => {
	const [data, setData] = useState(null);
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState(null);
	const [isFinished, setIsFinished] = useState(false);

	const isUnsubscribed = useRef(false);

	const run = useCallback(async (fn) => {
		setError(null);

		try {
			setIsFetching(true);
			const result = await fn();
			if (!isUnsubscribed.current) {
				setData(result);
			}
		} catch (err) {
			if (!isUnsubscribed.current) {
				setData(null);
				setError(err);
			}
		} finally {
			if (!isUnsubscribed.current) {
				setIsFinished(true);
				setIsFetching(false);
			}
		}
	}, []);

	const reload = useCallback(
		(...params) => {
			if (reloadFn) {
				run(() => reloadFn(...params));
			} else {
				run(defaultFn);
			}
		},
		[reloadFn, run, defaultFn]
	);

	useEffect(() => {
		if (defaultFn) {
			run(defaultFn);
		} else if (!fetchingFirst) {
			setIsFetching(false);
		}

		return () => {
			isUnsubscribed.current = true;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, error, isFetching, isFinished, reload };
};

export default usePromise;
