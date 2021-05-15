import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { TEXT_HEADER } from '@constants/text';
import { useAuth } from '@contexts/auth-provider';
import { IoIosSettings } from 'react-icons/io';
import { MdFeedback } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';
import { VARIABLES } from '@constants/global';

const { NAME: name } = VARIABLES.USERS;

const Profile = () => {
  const { user, logOut } = useAuth();
  const { PROFILE: TEXT_PROFILE } = TEXT_HEADER;
  return (
    <Menu autoSelect={false} closeOnBlur>
      <MenuButton as={Button} size="md" variant="ghost" colorScheme="gray">
        <Flex align="center">
          <Avatar name={user[name]} size="xs" />
          <Text ml="1.5">{user[name]}</Text>
        </Flex>
      </MenuButton>
      <MenuList zIndex="dropdown">
        <MenuItem icon={<IoIosSettings size={18} />}>{TEXT_PROFILE.SETTINGS}</MenuItem>
        <MenuItem icon={<MdFeedback size={18} />}>{TEXT_PROFILE.FEEDBACK}</MenuItem>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt size={18} />} onClick={logOut}>
          {TEXT_PROFILE.LOG_OUT}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
