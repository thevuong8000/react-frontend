import { useToast } from '@chakra-ui/toast';

export const TOAST_STATUS = {
	INFO: 'info',
	WARNING: 'warning',
	SUCCESS: 'success',
	ERROR: 'error'
};

const DEFAULT_TOAST_OPTIONS = {
	position: 'bottom-right', // top | top-left | top-right | bottom | bottom-left | bottom-right
	status: TOAST_STATUS.INFO
};
const useNotify = () => {
	const toast = useToast();

	const setNotifier = (toastProps) => {
		if (toastProps.id && toast.isActive(toastProps.id)) return;
		toast({ ...DEFAULT_TOAST_OPTIONS, ...toastProps });
	};
	return {
		setNotifier
	};
};

export default useNotify;
