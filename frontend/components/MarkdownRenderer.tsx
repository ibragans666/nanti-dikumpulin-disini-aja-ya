import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content, colorClass }: { content: string, colorClass: string }) {
  return (
    <ReactMarkdown
      components={{
        ul: ({node, ...props}) => <ul className={`list-disc pl-5 mb-3 space-y-1 ${colorClass}`} {...props} />,
        ol: ({node, ...props}) => <ol className={`list-decimal pl-5 mb-3 space-y-1 ${colorClass}`} {...props} />,
        li: ({node, ...props}) => <li className="pl-1 mb-1" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
        p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}