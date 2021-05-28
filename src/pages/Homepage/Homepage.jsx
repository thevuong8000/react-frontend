import { Flex, Text } from '@chakra-ui/layout';
import { API_PATH } from '@constants/configs';
import useApi from '@hooks/useApi';
import React, { useEffect, useState } from 'react';

const Homepage = ({ documentTitle }) => {
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
      .then((res) => {
        // console.log(res);
        setUsers(res.users ?? []);
      })
      .catch((err) => setUsers([]));
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
