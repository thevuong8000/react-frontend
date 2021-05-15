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
import { VARIABLES } from '@constants/global';
import Form from '@common/Form/Form';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { isValidPassword } from '@utilities/helper';
import useNotify, { TOAST_STATUS } from '@hooks/useNotify';

const InputField = ({ title, children }) => (
  <Flex direction="row" justifyContent="space-between" w="100%" align="center">
    <Text flexGrow="1">{title}</Text>
    <Box w="50%">{children}</Box>
  </Flex>
);

const {
  CURRENT_PASSWORD: curPass,
  NEW_PASSWORD: newPass,
  CONFIRM_PASSWORD: confirmPass
} = VARIABLES.USERS;
const DEFAULT_PAYLOAD = {
  [curPass]: '',
  [newPass]: '',
  [confirmPass]: ''
};
const ChangePasswordModal = ({ onClose }) => {
  const { setNotifier } = useNotify();
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);

  const _onFieldChange = (e) => {
    const { name: field, value } = e.target;
    setPayload((prevPayload) => ({ ...prevPayload, [field]: value }));
  };

  const _isValidPayload = () => {
    const errorMessage =
      payload[newPass] === payload[curPass]
        ? 'New password can not be the same with the current password'
        : payload[newPass] !== payload[confirmPass]
        ? 'The password is not matched'
        : isValidPassword(payload[newPass])
        ? 'The bad password'
        : '';
    return { isInValid: !!errorMessage, message: errorMessage };
  };

  const _onSubmit = (e) => {
    e.preventDefault();
    const checkPayload = _isValidPayload();
    if (checkPayload.isInValid) {
      setNotifier({
        status: TOAST_STATUS.ERROR,
        title: 'Invalid Password',
        description: checkPayload.message,
        id: 'invalid-password'
      });
      console.log(checkPayload.message);
      return;
    }
    console.log(payload);
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
                  name={curPass}
                  value={payload[curPass]}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder="password..."
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_MODAL.NEW_PASSWORD}:`}>
                <InputText
                  name={newPass}
                  value={payload[newPass]}
                  onChange={_onFieldChange}
                  type="password"
                  placeholder="password..."
                  isRequired
                />
              </InputField>
              <InputField title={`${TEXT_MODAL.CONFIRM_PASSWORD}:`}>
                <InputText
                  name={confirmPass}
                  value={payload[confirmPass]}
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
          >
            {TEXT_COMMON.CANCEL}
          </Button>
          <Button
            size="sm"
            colorScheme="teal"
            rightIcon={<AiOutlineCheck size={16} />}
            onClick={_onSubmit}
          >
            {TEXT_HEADER.PROFILE.CHANGE_PASSWORD}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
