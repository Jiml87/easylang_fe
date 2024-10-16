'use client';
import Image from 'next/image';
import { addNewPhrasePage } from '@/config/routes';
import bannerImage from '@/assets/images/banner/home_banner_v1.svg';
import Logo from '@/components/Logo/Logo';

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="wrapper-glass-container">
        <div className="glass-container">
          <header className="p-4">
            <Logo />
          </header>
          <main className="px-4 py-2 sm:py-4 md:grid md:grid-cols-2">
            <div className="justify-center md:flex md:flex-col">
              <div className="text-green-800 md:max-w-lg">
                <b className="text-xl sm:text-2xl">
                  Struggling to remember new words while learning a foreign
                  language?
                </b>
                <div className="pt-2 text-sm sm:text-base">
                  Simply add any word you want to learn, and the app will
                  schedule reminders to review it on the 1st, 3rd, 7th, and 30th
                  day. Plus, with smart AI-driven tasks, you&lsquo;ll practice
                  using the word in context, making it easier to retain and
                  understand.
                </div>
              </div>
              <div className="pt-6 md:pt-10">
                <a
                  rel="noopener noreferrer"
                  className="p-button p-button-warning p-button-raised font-bold text-white"
                  href={addNewPhrasePage.path}
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <Image src={bannerImage} alt="Banner image" />
            </div>
          </main>
          <footer className="p-4 text-xs text-gray-400">
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
    </div>
  );
};

export default HomePage;
