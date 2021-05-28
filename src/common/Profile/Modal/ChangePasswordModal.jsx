import React, { useState } from 'react';
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
import { TEXT_COMMON, TEXT_HEADER, TEXT_MODAL } from '@constants/text';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Form from '@common/Form/Form';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { isEmpty, isValidPassword } from '@utilities/helper';
import useNotify, { TOAST_STATUS } from '@hooks/useNotify';
import { useBoolean } from '@chakra-ui/hooks';
import useUsers from '@hooks/useUsers';
import { useAuth } from '@contexts/auth-provider';

const InputField = ({ title, children }) => (
  <Flex direction="row" justifyContent="space-between" w="100%" align="center">
    <Text flexGrow="1">{title}</Text>
    <Box w="50%">{children}</Box>
  </Flex>
);

const DEFAULT_PAYLOAD = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};
const ChangePasswordModal = ({ onClose }) => {
  const { setNotifier } = useNotify();
  const { changePassword } = useUsers();
  const { user } = useAuth();
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);

  const [isLoading, setIsLoading] = useBoolean(false);

  const isValid =
    !isEmpty(payload.newPassword) &&
    !isEmpty(payload.confirmPassword) &&
    payload.newPassword === payload.confirmPassword;

  const _onFieldChange = (e) => {
    const { name: field, value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, [field]: value }));
  };

  const _onSubmit = async (e) => {
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
        title: 'Change Password',
        description: 'Change password successfully!'
      });
      onClose();
    } catch (error) {
      setNotifier({
        status: TOAST_STATUS.ERROR,
        title: 'Invalid Password',
        description: error.message,
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
              <InputField title={`${TEXT_MODAL.CURRENT_PASSWORD}:`}>
                <InputText
                  name="currentPassword"
                  value={payload.currentPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder="password..."
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_MODAL.NEW_PASSWORD}:`}>
                <InputText
                  name="newPassword"
                  value={payload.newPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder="password..."
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_MODAL.CONFIRM_PASSWORD}:`}>
                <InputText
                  name="confirmPassword"
                  value={payload.confirmPassword}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder="password..."
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
