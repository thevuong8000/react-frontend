import { Button, Flex, Select } from '@chakra-ui/react';
import { Language } from '@common/CodeEditor/CodeEditor';
import { SUPPORTED_LANGUAGES } from '@constants/code-executor';
import React, { ChangeEventHandler, FC } from 'react';

interface ICandraHeaderFunctions {
  initLanguage: Language;
  handleCollapseAll: () => void;
  handleExpendAll: () => void;
  handleChangeLanguage: ChangeEventHandler<HTMLSelectElement>;
  handleAddTest: () => void;
  handleExecuteCode: () => void | Promise<void>;
}

const CandraFunctions: FC<ICandraHeaderFunctions> = ({
  initLanguage,
  handleCollapseAll,
  handleExpendAll,
  handleChangeLanguage,
  handleAddTest,
  handleExecuteCode
}) => {
  return (
    <Flex w="50%" justify="space-around" m="0 auto">
      <Select
        defaultValue={initLanguage}
        variant="filled"
        w="max-content"
        onChange={handleChangeLanguage}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={`code-lang-${lang}`} value={lang}>
            {lang}
          </option>
        ))}
      </Select>
      <Button size="md" onClick={handleAddTest}>
        Add Test
      </Button>
      <Button size="md" onClick={handleCollapseAll}>
        Collapse All
      </Button>
      <Button size="md" onClick={handleExpendAll}>
        Expand All
      </Button>
      <Button size="md" onClick={handleExecuteCode}>
        Execute
      </Button>
    </Flex>
  );
};

export default CandraFunctions;
