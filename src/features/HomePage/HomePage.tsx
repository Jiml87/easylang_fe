import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';
import Link from 'next/link';
import Image from 'next/image';

import { addNewPhrasePage } from '@/config/routes';
import bannerImage from '@/assets/images/banner/home_banner_v1.svg';

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home_page">
      <div className="glass_container">
        <div>
          <MainPageHeader />
          <main className="p-4 md:grid md:grid-cols-2">
            <div className="justify-center md:flex md:flex-col">
              <div className="text-green-700 md:max-w-lg">
                <b className="text-xl sm:text-2xl">
                  Struggling to remember new words while learning a foreign
                  language?
                </b>
                <div>
                  Simply add any word you want to learn, and the app will
                  schedule reminders to review it on the 1st, 3rd, 7th, and 30th
                  day. Plus, with smart AI-driven tasks, you&lsquo;ll practice
                  using the word in context, making it easier to retain and
                  understand.
                </div>
              </div>
              <div className="pt-6 md:pt-10">
                <Link
                  rel="noopener noreferrer"
                  className="p-button p-button-warning font-bold text-white"
                  href={addNewPhrasePage.path}
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <Image src={bannerImage} alt="Banner image" />
            </div>
          </main>
        </div>
        <footer className="p-4 text-xs text-slate-200">
          <div>
            Developed by&nbsp;
            <a
              className="underline underline-offset-2"
              href="https://www.linkedin.com/in/viacheslav-semenenko/"
              target="_blank"
            >
              Slavik Semenenko
            </a>
          </div>
          <div>
            <a
              href="https://lovepik.com/images/png-window.html"
              target="_blank"
            >
              Images from Lovepik.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
