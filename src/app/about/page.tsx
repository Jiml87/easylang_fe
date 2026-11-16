import type { Metadata } from 'next';
import AboutPage from '@/features/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'How It Works — MyWords',
  description:
    'Learn how MyWords uses Spaced Repetition, AI agent MCP integration, and instant mobile app access to build long-term vocabulary.',
};

export default function Page() {
  return <AboutPage />;
}
