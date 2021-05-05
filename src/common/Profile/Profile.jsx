import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button as ChakraButton } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { TEXT_HEADER } from '@constants/text';
import { useAuth } from '@contexts/auth-provider';
import { IoIosSettings } from 'react-icons/io';
import { MdFeedback } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

const ICON_SIZE = 20;

const Profile = () => {
  const { user, logOut } = useAuth();
  const { PROFILE: TEXT_PROFILE } = TEXT_HEADER;
  return (
    <Menu autoSelect={false}>
      <MenuButton as={ChakraButton} variant="ghost">
        <Flex align="center">
          <Avatar name={user.name} size="xs" />
          <Text ml="1.5">{user.name}</Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<IoIosSettings size={ICON_SIZE} />}>{TEXT_PROFILE.SETTINGS}</MenuItem>
        <MenuItem icon={<MdFeedback size={ICON_SIZE} />}>{TEXT_PROFILE.FEEDBACK}</MenuItem>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt size={ICON_SIZE} />} onClick={logOut}>
          {TEXT_PROFILE.LOG_OUT}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
