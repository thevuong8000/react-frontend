import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useState
} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';
import InputText from '@common/InputText/InputText';
import { TEXT_COMMON, TEXT_HEADER, TEXT_PROFILE } from '@constants/text';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Form from '@common/Form/Form';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { isEmpty, isValidPassword } from '@utilities/helper';
import useNotify, { TOAST_STATUS } from '@hooks/useNotify';
import { useBoolean } from '@chakra-ui/hooks';
import useUsers from '@hooks/useUsers';
import { useAuth } from '@contexts/auth-provider';
import { IInputField } from 'common/Form/Form';

interface IInputPassword {
  title: string;
}

const InputField: FC<IInputPassword> = ({ title, children }) => (
  <Flex direction="row" justifyContent="space-between" w="100%" align="center">
    <Text flexGrow="initial">{title}</Text>
    <Box w="50%">{children}</Box>
  </Flex>
);

const DEFAULT_PAYLOAD = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const ChangePasswordModal: FC<ModalBase> = ({ onClose }) => {
  const { setNotifier } = useNotify();
  const { changePassword } = useUsers();
  const { user } = useAuth();
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);

  const [isLoading, setIsLoading] = useBoolean(false);

  /* Submit button only active if
    1) All fields are fulfilled
    2) New password is matched  
  */
  const isValid =
    !isEmpty(payload.newPassword) &&
    !isEmpty(payload.confirmPassword) &&
    payload.newPassword === payload.confirmPassword;

  const _onFieldChange: ChangeEventHandler<IInputField> = (e: ChangeEvent<IInputField>) => {
    const { name: field, value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, [field]: value }));
  };

  const _onSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading.on();
    try {
      await changePassword(user.id, {
        current_password: payload.currentPassword,
        new_password: payload.newPassword
      });
      setNotifier({
        status: TOAST_STATUS.SUCCESS,
        description: TEXT_PROFILE.CHANGE_PASSWORD_SUCCESS
      });
      onClose();
    } catch (error) {
      setNotifier({
        status: TOAST_STATUS.ERROR,
        description: error.message ?? TEXT_PROFILE.CHANGE_PASSWORD_FAILURE,
        id: 'invalid-password'
      });
    } finally {
      setIsLoading.off();
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{TEXT_HEADER.PROFILE.CHANGE_PASSWORD}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={_onSubmit}>
            <Flex direction="column" gridGap="5">
              <InputField title={`${TEXT_PROFILE.CURRENT_PASSWORD}:`}>
                <InputText
                  name="currentPassword"
                  value={payload.currentPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder={TEXT_PROFILE.PASSWORD_PLACEHOLDER}
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_PROFILE.NEW_PASSWORD}:`}>
                <InputText
                  name="newPassword"
                  value={payload.newPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder={TEXT_PROFILE.PASSWORD_PLACEHOLDER}
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_PROFILE.CONFIRM_PASSWORD}:`}>
                <InputText
                  name="confirmPassword"
                  value={payload.confirmPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder={TEXT_PROFILE.PASSWORD_PLACEHOLDER}
                  isRequired
                />
              </InputField>
            </Flex>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            colorScheme="red"
            mr={3}
            onClick={onClose}
            rightIcon={<AiOutlineClose size={16} />}
            isDisabled={isLoading}
          >
            {TEXT_COMMON.CANCEL}
          </Button>
          <Button
            size="sm"
            colorScheme="teal"
            rightIcon={<AiOutlineCheck size={16} />}
            onClick={_onSubmit}
            isLoading={isLoading}
            loadingText={TEXT_HEADER.PROFILE.CHANGE_PASSWORD}
            isDisabled={!isValid}
          >
            {TEXT_HEADER.PROFILE.CHANGE_PASSWORD}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
