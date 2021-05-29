import { useToast } from '@chakra-ui/toast';

export const TOAST_STATUS = {
	INFO: 'info', // default
	WARNING: 'warning',
	SUCCESS: 'success',
	ERROR: 'error'
};

const DEFAULT_TOAST_OPTIONS = {
	position: 'top', // top | top-left | top-right | bottom | bottom-left | bottom-right
	status: TOAST_STATUS.INFO,
	isClosable: true
};

const DEFAULT_TITLE = {
	[TOAST_STATUS.INFO]: 'Information',
	[TOAST_STATUS.WARNING]: 'Warning',
	[TOAST_STATUS.SUCCESS]: 'Success',
	[TOAST_STATUS.ERROR]: 'Error'
};

const useNotify = () => {
	const toast = useToast();

	const setNotifier = ({ title, description, status = TOAST_STATUS.INFO, ...toastProps }) => {
		if (toastProps.id && toast.isActive(toastProps.id)) return;
		toast({
			...DEFAULT_TOAST_OPTIONS,
			...toastProps,
			title: title ?? DEFAULT_TITLE[status],
			description,
			status
		});
	};
	return {
		setNotifier
	};
};

export default useNotify;
// Source: https://chakra-ui.com/docs/feedback/toast
