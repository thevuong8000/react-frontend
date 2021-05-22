import { useToast } from '@chakra-ui/toast';

export const TOAST_STATUS = {
	INFO: 'info',
	WARNING: 'warning',
	SUCCESS: 'success',
	ERROR: 'error'
};

const DEFAULT_TOAST_OPTIONS = {
	position: 'top', // top | top-left | top-right | bottom | bottom-left | bottom-right
	status: TOAST_STATUS.INFO,
	isClosable: true
};
const useNotify = () => {
	const toast = useToast();

	const setNotifier = ({ title, description, ...toastProps }) => {
		if (toastProps.id && toast.isActive(toastProps.id)) return;
		toast({ ...DEFAULT_TOAST_OPTIONS, ...toastProps, title, description });
	};
	return {
		setNotifier
	};
};

export default useNotify;
// Source: https://chakra-ui.com/docs/feedback/toast
