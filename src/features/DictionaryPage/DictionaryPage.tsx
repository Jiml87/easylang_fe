import { TabView, TabPanel } from 'primereact/tabview';
import './DictionaryPage.css';
import { LearnTodayTab } from './components/LearnTodayTab/LearnTodayTab';

const DictionaryPage = () => {
  return (
    <div className="flex grow flex-col">
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
    </div>
  );
};

export default DictionaryPage;
