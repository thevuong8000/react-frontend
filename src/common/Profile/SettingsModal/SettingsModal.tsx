import React, { FC, FormEvent, FormEventHandler, useCallback, useMemo } from 'react';
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
import { TEXT_COMMON, TEXT_HEADER } from '@constants/text';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import Form from '@common/Form/Form';
import { AiOutlineClose, AiFillSave } from 'react-icons/ai';
import useNotify from '@hooks/useNotify';
import useUsers from '@hooks/useUsers';
import { useAuth } from '@contexts/auth-provider';

interface IZone {
  title: string;
}

const Zone: FC<IZone> = ({ title, children }) => (
  <Flex direction="column">
    <Heading fontSize="xl">{title}</Heading>
    <Box mt="3" borderWidth="thin" borderRadius="lg" p="3">
      {children}
    </Box>
  </Flex>
);

const SettingsModal: FC<ModalBase> = ({ onClose }) => {
  const { user, logOut } = useAuth();
  const { deleteUser } = useUsers();
  const { setNotifier } = useNotify();

  const _onSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
  };

  const _onDelete = useCallback(() => {
    if (window.confirm('Are you sure?')) {
      deleteUser(user.id);
      logOut();
    }
  }, []);

  const DANGER_ACTIONS = useMemo(
    () => [
      {
        title: 'Delete Account',
        description: 'Permanently delete this account',
        onTrigger: _onDelete,
        buttonText: 'Delete Account'
      }
    ],
    []
  );

  return (
    <Modal size="2xl" isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{TEXT_HEADER.PROFILE.SETTINGS}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={_onSubmit}>
            <Stack spacing="8">
              {/* General Settings */}
              <Zone title="General Settings">This is general settings</Zone>

              {/* Danger Zone */}
              <Zone title="Danger Zone">
                <Stack>
                  {DANGER_ACTIONS.map((action, index) => (
                    <Flex
                      key={`danger-action-${index}`}
                      direction="row"
                      justify="space-between"
                      align="center"
                    >
                      <Flex direction="column">
                        <Text fontWeight="semibold">{action.title}</Text>
                        <Text>{action.description}</Text>
                      </Flex>
                      <Button size="sm" colorScheme="red" onClick={action.onTrigger}>
                        <Text>{action.buttonText}</Text>
                      </Button>
                    </Flex>
                  ))}
                </Stack>
              </Zone>
            </Stack>
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
            colorScheme="blue"
            rightIcon={<AiFillSave size={16} />}
            onClick={_onSubmit}
          >
            {TEXT_COMMON.SAVE}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
