import { Flex, Text } from '@chakra-ui/layout';
import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import { PageBase } from 'paging';
import React, { FC, useEffect, useState } from 'react';

const Homepage: FC<PageBase> = ({ documentTitle }) => {
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const { apiGet } = useApi();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    apiGet(API_PATH.USERS.ROOT)
      .then((res: any) => {
        setUsers(res.users ?? []);
      })
      .catch((err: any) => setUsers([]));
  }, []);

  return (
    <Flex direction="column">
      {users.map((user) => (
        <Text key={user.id}>{`${user.id} => ${user.name}`}</Text>
      ))}
    </Flex>
  );
};

export default Homepage;
