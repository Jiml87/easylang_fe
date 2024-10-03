import { TabView, TabPanel } from 'primereact/tabview';

import { useAppSelector } from '@/store/hooks';
import { selectWordCounts } from '@/features/DictionaryPage/dictionarySlice';
import { LearnTodayTab } from './components/LearnTodayTab/LearnTodayTab';
import { LearnSoonTab } from './components/LearnSoonTab/LearnSoonTab';
import { FinishedWordsTab } from './components/FinishedWordsTab/FinishedWordsTab';

import './DictionaryPage.css';

const DictionaryPage = () => {
  const {
    numberLearningWordsForToday,
    numberLearningWordsSoon,
    numberFinishedWords,
  } = useAppSelector(selectWordCounts);

  return (
    <TabView className="DictionaryPage">
      <TabPanel header={`Learn Today (${numberLearningWordsForToday})`}>
        <LearnTodayTab />
      </TabPanel>
      <TabPanel header={`Learn Soon (${numberLearningWordsSoon})`}>
        <LearnSoonTab />
      </TabPanel>
      <TabPanel header={`Finished Words (${numberFinishedWords})`}>
        <FinishedWordsTab />
      </TabPanel>
    </TabView>
  );
};

export default DictionaryPage;
