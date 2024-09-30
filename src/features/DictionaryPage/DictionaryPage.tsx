import { TabView, TabPanel } from 'primereact/tabview';

import { useAppSelector } from '@/store/hooks';
import { selectCountLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { LearnTodayTab } from './components/LearnTodayTab/LearnTodayTab';
import './DictionaryPage.css';

const DictionaryPage = () => {
  const countLearningWords = useAppSelector(selectCountLearningWordsForToday);
  return (
    <TabView className="DictionaryPage">
      <TabPanel header={`Learn Today (${countLearningWords})`}>
        <LearnTodayTab />
      </TabPanel>
      <TabPanel header="Learn Soon">
        <div className="empty-list">There&apos;s nothing to learn soon</div>
      </TabPanel>
      <TabPanel header="Finished Words">
        <div className="empty_list">There&apos;s not finished words yet</div>
      </TabPanel>
    </TabView>
  );
};

export default DictionaryPage;
