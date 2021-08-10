import useApi from './useApi';
import useNotify, { DEFAULT_TOAST_OPTIONS } from './useNotify';
import { useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { API_PATH } from '@constants/configs';

const useServerStatus = () => {
	const toast = useToast();
	const { apiGet } = useApi();
	const { setNotifier } = useNotify();

	const toastIdRef = useRef<string | number | undefined>(undefined);

	const _tryApi = () => apiGet(API_PATH.ROOT);

	const _setServerErrorNotification = () => {
		toast.closeAll();

		setNotifier({
			title: 'Server is down',
			description: `There might be some problems occurred with the server.
				Please contact ducmanh.tran2904@gmail.com`,
			duration: null,
			status: 'error'
		});
	};

	const checkIfServerIsRestarting = async () => {
		let serverErrorTimeout = null;

		// Notify server is restarting if server "Hello world" response takes more than 2 seconds
		const timeout = setTimeout(() => {
			toastIdRef.current = setNotifier({
				title: 'Server is currently restarting',
				description: 'Heroku server takes about 30 seconds to be up. Please chill!',
				duration: null,
				id: 'heroku-server-restart',
				status: 'info'
			});

			// Notify error if server response takes more than 15 seconds
			serverErrorTimeout = setTimeout(_setServerErrorNotification, 35000);
		}, 2000);

		try {
			await _tryApi();

			if (toastIdRef.current) {
				toast.update(toastIdRef.current, {
					...DEFAULT_TOAST_OPTIONS,
					title: 'Server is currently up',
					description: 'The server is currently up. Enjoy testing your code!',
					duration: 5000,
					status: 'success'
				});
			}
		} catch (e) {
			_setServerErrorNotification();
		}

		// clear all timeout
		clearTimeout(timeout);
		if (serverErrorTimeout) clearTimeout(serverErrorTimeout);
	};

	return { checkIfServerIsRestarting };
};

export default useServerStatus;
