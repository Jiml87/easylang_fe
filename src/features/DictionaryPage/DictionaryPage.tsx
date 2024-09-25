import { TabView, TabPanel } from 'primereact/tabview';
import { LearnTodayTab } from './components/LearnTodayTab/LearnTodayTab';
import './DictionaryPage.css';

const DictionaryPage = () => {
  return (
    <TabView className="tab_view">
      <TabPanel header="Learn Today">
        <LearnTodayTab />
      </TabPanel>
      <TabPanel header="Learn Soon">
        <div className="empty_list">No words to learn soon</div>
      </TabPanel>
      <TabPanel header="Finished Words">
        <div className="empty_list">No finished words yet</div>
      </TabPanel>
    </TabView>
  );
};

export default DictionaryPage;
