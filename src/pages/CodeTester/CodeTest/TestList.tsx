import { Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import CodeTest, { ICodeTest, ICodeTestContent } from './CodeTest';

interface ITestList {
  tests: ICodeTestContent[];
  isExecuting: boolean;
  handleTestChange: ICodeTest['handleOnChange'];
  handleRemoveTest: ICodeTest['handleOnRemove'];
}
const TestList: FC<ITestList> = ({ tests, isExecuting, handleTestChange, handleRemoveTest }) => {
  if (tests.length <= 0)
    return (
      <Heading m="0 auto" mb="4">
        You have no test
      </Heading>
    );

  return (
    <>
      {tests.map((test, idx) => (
        <CodeTest
          key={`test-${idx}`}
          index={idx}
          isExecuting={isExecuting}
          test={test}
          handleOnChange={handleTestChange}
          handleOnRemove={handleRemoveTest}
        />
      ))}
    </>
  );
};

export default TestList;
