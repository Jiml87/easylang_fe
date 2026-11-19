'use client';

import { memo } from 'react';
import {
  MarkdownTextPrimitive,
  memoizeMarkdownComponents,
} from '@assistant-ui/react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = memoizeMarkdownComponents({
  a: ({ className, children, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  ),
  table: ({ className, children, ...props }) => (
    <div className="my-2 overflow-x-auto">
      <table className={className} {...props}>
        {children}
      </table>
    </div>
  ),
});

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
      smooth={false}
      className="prose prose-sm prose-slate max-w-none break-words prose-headings:mb-1.5 prose-headings:mt-3 prose-headings:font-semibold prose-p:my-1.5 prose-p:leading-relaxed prose-a:text-[#087f38] prose-blockquote:my-2 prose-blockquote:border-[#087f38]/40 prose-blockquote:not-italic prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none prose-pre:my-2 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-ol:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-hr:my-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);
