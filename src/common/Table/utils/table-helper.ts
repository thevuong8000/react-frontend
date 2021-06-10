import { ThemeTypings } from '@chakra-ui/react';

/**
 * Get coresponding color related to code
 * @param {*} code should be number for color
 * @returns {string}
 */
export const getStatusColorCode = (code: any): ThemeTypings['colorSchemes'] => {
  switch (code) {
    case 1:
      return 'orange'; // pending
    case 2:
      return 'blue'; // processing
    case 3:
      return 'green'; // done
    case 4:
      return 'yellow'; // timeout
    case 5:
      return 'red'; // error
    default:
      return 'gray';
  }
};
