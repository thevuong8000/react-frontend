import { Tab, TabList, TabPanel, TabPanels, Tabs, UseTabsProps } from '@chakra-ui/react';
import React, { FC, useCallback, useMemo } from 'react';
import ListTests, { IListTests } from './ListTests/ListTests';

export type IExecutionMode = 'Competitive Programming' | 'Regular';

interface IExecutor extends IListTests {
  executionMode: IExecutionMode;
  setExecutionMode: React.Dispatch<React.SetStateAction<IExecutionMode>>;
}

interface ITabMode {
  label: IExecutionMode;
  content: React.ReactNode;
}

const Executor: FC<IExecutor> = ({
  executionMode,
  setExecutionMode,
  tests,
  handleTestChange,
  handleRemoveTest,
  handleRunSingleTest
}) => {
  const tabData: ITabMode[] = useMemo(
    () => [
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
    ],
    [tests, handleTestChange, handleRemoveTest, handleRunSingleTest]
  );

  const _handleOnChange: UseTabsProps['onChange'] = useCallback(
    (index) => {
      setExecutionMode(tabData[index].label);
    },
    [tabData]
  );

  const tabIndex = tabData.findIndex((tab) => tab.label === executionMode);

  return (
    <Tabs variant="solid-rounded" colorScheme="blue" index={tabIndex} onChange={_handleOnChange}>
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
