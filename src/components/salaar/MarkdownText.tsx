import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

function renderInline(text: string): React.ReactNode[] {
  // Split inline code `...` and bold **...** safely without HTML injection
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={idx}
          className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-surface-2 border border-border text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="my-3 rounded-xl border border-border overflow-hidden bg-surface-2">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-surface text-xs text-muted font-mono">
        <span>{lang || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-surface text-ink hover:bg-surface-2 text-[11px] font-sans font-medium"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-xs leading-relaxed font-mono text-ink m-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MarkdownText({ content }: { content: string }) {
  const segments = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="salaar-markdown flex flex-col gap-2 text-sm leading-relaxed text-ink">
      {segments.map((seg, sIdx) => {
        if (seg.startsWith("```") && seg.endsWith("```")) {
          const firstNewline = seg.indexOf("\n");
          const lang = firstNewline > 3 ? seg.slice(3, firstNewline).trim() : "";
          const code =
            firstNewline >= 0
              ? seg.slice(firstNewline + 1, -3).trimEnd()
              : seg.slice(3, -3).trim();
          return <CodeBlock key={sIdx} code={code} lang={lang} />;
        }

        const lines = seg.split(/\r?\n/);
        const blocks: React.ReactNode[] = [];
        let listBuffer: { ordered: boolean; items: string[] } | null = null;

        const flushList = (keyPrefix: string) => {
          if (!listBuffer) return;
          const Tag = listBuffer.ordered ? "ol" : "ul";
          blocks.push(
            <Tag
              key={keyPrefix}
              className={`${
                listBuffer.ordered ? "list-decimal" : "list-disc"
              } pl-5 my-1 flex flex-col gap-1 text-ink-2`}
            >
              {listBuffer.items.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </Tag>,
          );
          listBuffer = null;
        };

        lines.forEach((rawLine, lIdx) => {
          const line = rawLine.trimEnd();
          const trimmed = line.trim();

          if (!trimmed) {
            flushList(`list-${sIdx}-${lIdx}`);
            return;
          }

          // Headings
          const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
          if (headingMatch) {
            flushList(`list-${sIdx}-${lIdx}`);
            const level = headingMatch[1].length;
            const cls =
              level <= 2
                ? "font-heading text-base font-bold text-ink mt-2"
                : "font-heading text-sm font-semibold text-ink mt-1.5";
            blocks.push(
              <div key={`h-${sIdx}-${lIdx}`} className={cls}>
                {renderInline(headingMatch[2])}
              </div>,
            );
            return;
          }

          // Ordered list item
          const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
          if (olMatch) {
            if (!listBuffer || !listBuffer.ordered) {
              flushList(`list-${sIdx}-${lIdx}`);
              listBuffer = { ordered: true, items: [] };
            }
            listBuffer.items.push(olMatch[1]);
            return;
          }

          // Unordered list item
          const ulMatch = trimmed.match(/^[-*•]\s+(.+)$/);
          if (ulMatch) {
            if (!listBuffer || listBuffer.ordered) {
              flushList(`list-${sIdx}-${lIdx}`);
              listBuffer = { ordered: false, items: [] };
            }
            listBuffer.items.push(ulMatch[1]);
            return;
          }

          flushList(`list-${sIdx}-${lIdx}`);
          blocks.push(
            <p key={`p-${sIdx}-${lIdx}`} className="m-0 text-ink-2 leading-relaxed break-words">
              {renderInline(trimmed)}
            </p>,
          );
        });

        flushList(`list-end-${sIdx}`);
        return <React.Fragment key={sIdx}>{blocks}</React.Fragment>;
      })}
    </div>
  );
}
