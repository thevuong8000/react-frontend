import { Accordion, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import Test, { ITest, ITestCase } from './Test';

export interface IListTests {
  tests: ITestCase[];
  handleTestChange: ITest['handleOnChange'];
  handleRemoveTest: ITest['handleOnRemove'];
  handleRunSingleTest: ITest['handleOnRunSingleTest'];
}
const ListTests: FC<IListTests> = ({
  tests,
  handleTestChange,
  handleRemoveTest,
  handleRunSingleTest
}) => {
  const indices = tests
    .map((test, idx) => (test.isCollapsed ? null : idx))
    .filter((expandedIdx) => expandedIdx !== null);

  if (tests.length <= 0)
    return (
      <Heading m="0 auto" mb="4">
        You have no test
      </Heading>
    );

  return (
    <Accordion index={indices as number[]} allowMultiple allowToggle>
      {tests.map((test, idx) => (
        <Test
          key={`test-${idx}`}
          test={test}
          handleOnChange={handleTestChange}
          handleOnRemove={handleRemoveTest}
          handleOnRunSingleTest={handleRunSingleTest}
        />
      ))}
    </Accordion>
  );
};

export default ListTests;
