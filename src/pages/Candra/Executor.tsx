import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { FC } from 'react';
import ListTests, { IListTests } from './ListTests/ListTests';

interface IExecutor extends IListTests {}

export type IExecutionMode = 'Competitive Programming' | 'Regular';

interface ITabMode {
  label: IExecutionMode;
  content: React.ReactNode;
}

const Executor: FC<IExecutor> = ({
  tests,
  handleTestChange,
  handleRemoveTest,
  handleRunSingleTest
}) => {
  const tabData: ITabMode[] = [
    {
      label: 'Competitive Programming',
      content: (
        <ListTests
          tests={tests}
          handleTestChange={handleTestChange}
          handleRemoveTest={handleRemoveTest}
          handleRunSingleTest={handleRunSingleTest}
        />
      )
    },
    { label: 'Regular', content: <span>Regular Mode</span> }
  ];

  return (
    <Tabs variant="solid-rounded" colorScheme="blue">
      <TabList>
        {tabData.map((tab, idx) => (
          <Tab key={`tab-label-${idx}`}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabData.map((tab, idx) => (
          <TabPanel key={`tab-content-${idx}`}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default Executor;
