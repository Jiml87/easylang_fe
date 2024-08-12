import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home_page">
      <div className="glass_container">
        <MainPageHeader />
        <main>Home</main>
      </div>
    </div>
  );
};

export default HomePage;
