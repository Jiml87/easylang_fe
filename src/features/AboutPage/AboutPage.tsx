'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'primereact/button';
import authorPhoto from '@/assets/images/author-slavik.jpg';
import Logo from '@/components/Logo/Logo';
import { addNewPhrasePage, rootPage } from '@/config/routes';
import { APP_VERSION } from '@/constants/env';
import {
  addErrorMessage,
  addSuccessMessage,
} from '@/features/MessagesBar/messagesBarSlice';
import { useAppDispatch } from '@/store/hooks';

import './AboutPage.css';

const MCP_PUBLIC_URL = 'https://mywords.pro/mcp';
const LINKEDIN_URL = 'https://www.linkedin.com/in/viacheslav-semenenko/';
const YOUTUBE_WATCH_URL = 'https://youtu.be/jKUV-xsgXEk';
const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/jKUV-xsgXEk';

const REVIEW_INTERVALS = ['Day 1', 'Day 3', 'Day 7', 'Day 30'];

const AI_PROMPTS = [
  'Add this word to my MyWords dictionary.',
  'Generate examples for the words I am currently learning.',
  'Show me words that describe a kitchen and create examples with them.',
];

const AboutPage = () => {
  const dispatch = useAppDispatch();

  const handleCopyMcpUrl = async () => {
    try {
      await navigator.clipboard.writeText(MCP_PUBLIC_URL);
      dispatch(addSuccessMessage({ detail: 'MCP URL copied' }));
    } catch {
      dispatch(
        addErrorMessage({
          detail: 'Could not copy. Select and copy manually.',
        }),
      );
    }
  };

  return (
    <div className="AboutPage">
      <div className="wrapper-glass-container">
        <div className="glass-container">
          <header className="flex items-center justify-between gap-3 border-b border-white/50 p-4 sm:px-6">
            <Logo />
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href={rootPage.path}
                className="rounded-full px-3 py-1.5 text-sm font-semibold text-green-900 transition hover:bg-white/40"
              >
                Home
              </Link>
              <a
                rel="noopener noreferrer"
                className="p-button p-button-warning p-button-raised px-3.5 py-2 text-sm font-bold text-white"
                href={addNewPhrasePage.path}
              >
                Get Started
              </a>
            </div>
          </header>

          <main className="flex flex-col gap-6 p-4 sm:gap-8 sm:p-6">
            <section className="glass-section p-5 sm:p-7">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                <i className="pi pi-bolt text-xs" />
                <span>How MyWords Works</span>
              </div>

              <h1 className="my-2 text-left text-2xl font-bold text-green-950 sm:text-3xl">
                Built Around the Science of Spaced Repetition
              </h1>

              <div className="space-y-3 text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                <p>
                  MyWords is a vocabulary learning platform built around the
                  science of <strong>Spaced Repetition</strong> — one of the
                  most effective techniques for long-term memory retention.
                </p>
                <p>
                  Instead of learning words once and forgetting them, MyWords
                  reminds you to review them at carefully spaced intervals:
                  after <strong>1 day</strong>, <strong>3 days</strong>,{' '}
                  <strong>7 days</strong>, and <strong>30 days</strong>.
                </p>
              </div>

              <div className="my-4 flex flex-wrap gap-2">
                {REVIEW_INTERVALS.map((interval, index) => (
                  <div key={interval} className="flex items-center gap-2">
                    <span className="rounded-full border border-emerald-700/25 bg-white/80 px-3.5 py-1 text-xs font-bold text-emerald-900 shadow-sm sm:text-sm">
                      {interval}
                    </span>
                    {index < REVIEW_INTERVALS.length - 1 ? (
                      <i className="pi pi-arrow-right text-xs text-emerald-800/60" />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                <p>
                  This science-based approach helps strengthen memory, reduce
                  forgetting, and move new vocabulary into your long-term
                  memory.
                </p>
                <p className="font-semibold text-green-900">
                  Learn smarter, remember longer, and build your vocabulary for
                  life with MyWords!
                </p>
              </div>

              <div className="mt-6">
                <div className="overflow-hidden rounded-2xl border border-white/80 bg-black/5 shadow-md">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={YOUTUBE_EMBED_URL}
                      title="How MyWords works"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <a
                    href={YOUTUBE_WATCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-900 underline underline-offset-2 hover:text-green-700 sm:text-sm"
                  >
                    <i className="pi pi-youtube text-sm" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>

              <div className="glass-tip mt-6 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-800">
                    <i className="pi pi-lightbulb text-base" />
                  </div>
                  <div>
                    <h3 className="my-0 text-base font-bold text-amber-950 sm:text-lg">
                      Pro Tip: Save Phrases Instead of Single Words
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-amber-950/90 sm:text-base">
                      If you are learning a language where words change by
                      gender and grammatical case (such as Spanish, Romanian,
                      Ukrainian, and others), save short phrases rather than
                      isolated words:{' '}
                      <span className="font-semibold">
                        &ldquo;green apple&rdquo;, &ldquo;green car&rdquo;,
                        &ldquo;my T-shirt&rdquo;...
                      </span>{' '}
                      Learning words in natural pairs helps you effortlessly
                      remember gender agreement and word forms in context.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="glass-section p-5 sm:p-7">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                <i className="pi pi-sparkles text-xs" />
                <span>AI Integration (MCP)</span>
              </div>

              <h2 className="my-2 text-xl font-bold text-green-950 sm:text-2xl">
                Connect MyWords to Any AI Agent
              </h2>

              <p className="text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                You can connect MyWords with your favorite AI assistant —{' '}
                <strong>ChatGPT, Claude, Gemini</strong>, and other
                MCP-compatible agents — using the MyWords MCP server URL:
              </p>

              <div className="my-4 flex items-center gap-2 rounded-xl border border-white/80 bg-white/80 px-3.5 py-2 shadow-sm">
                <code className="block flex-1 overflow-x-auto text-xs font-semibold text-emerald-950 sm:text-sm">
                  {MCP_PUBLIC_URL}
                </code>
                <Button
                  type="button"
                  icon="pi pi-copy"
                  rounded
                  text
                  aria-label="Copy MCP URL"
                  onClick={handleCopyMcpUrl}
                />
              </div>

              <p className="mb-3 text-sm font-semibold text-green-950 sm:text-base">
                Once connected, simply ask your AI assistant:
              </p>

              <div className="grid gap-2.5">
                {AI_PROMPTS.map((prompt) => (
                  <div
                    key={prompt}
                    className="flex items-start gap-2.5 rounded-xl border border-white/75 bg-white/65 px-3.5 py-2.5 text-sm text-emerald-950 shadow-sm sm:text-base"
                  >
                    <i className="pi pi-comment mt-1 text-xs text-emerald-700" />
                    <span className="italic">&ldquo;{prompt}&rdquo;</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm font-semibold text-green-900 sm:text-base">
                From there, the only limit is your imagination!
              </p>
            </section>
            <section className="glass-section p-5 sm:p-7">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                <i className="pi pi-mobile text-xs" />
                <span>Instant Mobile Access</span>
              </div>

              <h2 className="my-2 text-xl font-bold text-green-950 sm:text-2xl">
                Spotted a New Word and Want to Save It Fast?
              </h2>

              <p className="text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                Install the website as an app on your phone and launch MyWords
                in <strong>1.1 seconds</strong> — ready to save a new word or
                phrase the moment you see it.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm sm:p-5">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600/15 text-emerald-800">
                      <i className="pi pi-android text-lg" />
                    </div>
                    <h3 className="my-0 text-base font-bold text-green-950 sm:text-lg">
                      Instructions for Android
                    </h3>
                  </div>
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-emerald-950/90">
                    <li>
                      Open <strong>mywords.pro</strong> in{' '}
                      <strong>Chrome</strong>.
                    </li>
                    <li>
                      Tap the menu icon (<strong>&#8942;</strong>) in the
                      top-right corner.
                    </li>
                    <li>
                      Tap <strong>Install app</strong> or{' '}
                      <strong>Add to Home screen</strong> and confirm.
                    </li>
                  </ol>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm sm:p-5">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/10 text-slate-800">
                      <i className="pi pi-apple text-lg" />
                    </div>
                    <h3 className="my-0 text-base font-bold text-green-950 sm:text-lg">
                      Instructions for iOS
                    </h3>
                  </div>
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-emerald-950/90">
                    <li>
                      Open <strong>mywords.pro</strong> in{' '}
                      <strong>Safari</strong>.
                    </li>
                    <li>
                      Tap the <strong>Share</strong> button at the bottom of the
                      screen.
                    </li>
                    <li>
                      Scroll down, select <strong>Add to Home Screen</strong>,
                      and tap <strong>Add</strong>.
                    </li>
                  </ol>
                </div>
              </div>
            </section>
            <section className="glass-section p-5 sm:p-7">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                <i className="pi pi-comments text-xs" />
                <span>Feedback &amp; Contact</span>
              </div>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={authorPhoto}
                    alt="Viacheslav Semenenko"
                    width={80}
                    height={80}
                    className="h-16 w-16 shrink-0 rounded-full border-2 border-white/90 object-cover shadow-md ring-2 ring-emerald-600/20 sm:h-20 sm:w-20"
                  />
                  <div>
                    <h2 className="my-1 text-xl font-bold text-green-950 sm:text-2xl">
                      Have Feedback or Suggestions?
                    </h2>
                    <p className="my-0 text-sm leading-relaxed text-emerald-950/90 sm:text-base">
                      If you have any remarks, ideas, or suggestions for
                      improving MyWords, feel free to message me on LinkedIn.
                    </p>
                  </div>
                </div>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-[#004182]"
                >
                  <i className="pi pi-linkedin text-base" />
                  <span>Message on LinkedIn</span>
                </a>
              </div>
            </section>
            <div className="flex flex-col items-center py-2 text-center">
              <a
                rel="noopener noreferrer"
                className="p-button p-button-warning p-button-raised font-bold text-white"
                href={addNewPhrasePage.path}
              >
                Start Learning Now
              </a>
            </div>
          </main>

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/50 p-4 text-xs text-emerald-950/60 sm:px-6">
            <div>
              Developed by&nbsp;
              <a
                className="underline underline-offset-2"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Slavik Semenenko
              </a>
            </div>
            <div>v: {APP_VERSION}</div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
