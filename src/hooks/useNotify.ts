import { UseToastOptions } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';

const DEFAULT_TOAST_OPTIONS: UseToastOptions = {
  position: 'top',
  status: 'info',
  isClosable: true
};

const DEFAULT_TITLE = {
  info: 'Information',
  warning: 'Warning',
  success: 'Success',
  error: 'Error'
};

const useNotify = () => {
  const toast = useToast();

  const setNotifier = ({ title, description, status = 'info', ...toastProps }: UseToastOptions) => {
    /* Prevent duplicate toast */
    if (toastProps.id && toast.isActive(toastProps.id)) return;

    toast({
      ...DEFAULT_TOAST_OPTIONS,
      ...toastProps,
      title: title ?? DEFAULT_TITLE[status],
      description,
      status
    } as UseToastOptions);
  };
  return {
    setNotifier
  };
};

export default useNotify;
// Source: https://chakra-ui.com/docs/feedback/toast
