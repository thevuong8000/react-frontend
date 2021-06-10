import React, { FC } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/menu';
import { TEXT_HEADER } from '@constants/text';
import { useAuth } from '@contexts/auth-provider';
import { IoIosSettings } from 'react-icons/io';
import { MdFeedback } from 'react-icons/md';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useBoolean } from '@chakra-ui/hooks';
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal';
import SettingsModal from './SettingsModal/SettingsModal';

const Profile: FC = () => {
  const { user, logOut } = useAuth();
  const { PROFILE: TEXT_PROFILE } = TEXT_HEADER;

  const [showChangePassword, setShowChangePassword] = useBoolean(false);
  const [showSettings, setShowSettings] = useBoolean(false);

  return (
    <>
      <Menu autoSelect={false} closeOnBlur>
        <MenuButton as={Button} size="md" variant="ghost" colorScheme="gray">
          <Flex align="center">
            <Avatar name={user.displayName} size="xs" />
            <Text ml="1.5">{user.displayName}</Text>
          </Flex>
        </MenuButton>
        <MenuList zIndex="dropdown">
          <MenuItem icon={<IoIosSettings size={18} />} onClick={setShowSettings.on}>
            {TEXT_PROFILE.SETTINGS}
          </MenuItem>
          <MenuItem icon={<MdFeedback size={18} />}>{TEXT_PROFILE.FEEDBACK}</MenuItem>
          <MenuItem icon={<FaLock size={18} />} onClick={setShowChangePassword.on}>
            {TEXT_PROFILE.CHANGE_PASSWORD}
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<FaSignOutAlt size={18} />} onClick={logOut}>
            {TEXT_PROFILE.LOG_OUT}
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Modal here */}
      {showChangePassword && <ChangePasswordModal onClose={setShowChangePassword.off} />}
      {showSettings && <SettingsModal onClose={setShowSettings.off} />}
    </>
  );
};

export default Profile;
