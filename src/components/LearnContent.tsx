// src/components/LearnContent.tsx
// Comprehensive Aptitude Topic Layout for CodeCrex

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Printer,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Target,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { useStore } from "../store";
import {
  allAptitudeTopics,
  getAptitudeTopicById,
  type Formula,
} from "../data/aptitude/index";
import { aptitudeTopics as aptitudePathGroups } from "../data/aptitude";

// Math helper components
export function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col text-center align-middle mx-1 text-xs font-mono font-medium leading-none">
      <span className="border-b border-current pb-0.5 px-1">{n}</span>
      <span className="pt-0.5 px-1">{d}</span>
    </span>
  );
}

export function Sup({ children }: { children: React.ReactNode }) {
  return <sup className="text-[0.75em] font-mono leading-none align-super">{children}</sup>;
}

export function Sqrt({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-mono">
      <span>√</span>
      <span className="border-t border-current px-0.5">{children}</span>
    </span>
  );
}

// Format formula expression with helper math rendering where applicable
function renderFormulaExpression(expr: string) {
  return <code className="text-sm md:text-base font-mono font-semibold tracking-tight text-ink">{expr}</code>;
}

interface LearnContentProps {
  topic?: (typeof aptitudePathGroups)[number];
  activeTopicId?: string;
  onSelectTopic?: (id: string) => void;
  onGoToPractice?: () => void;
}

export default function LearnContent({
  topic: pathGroup,
  activeTopicId,
  onSelectTopic,
  onGoToPractice,
}: LearnContentProps) {
  // Determine current active topic
  const group = pathGroup?.id || "quantitative";
  const groupTopics = allAptitudeTopics.filter((t) => t.group === group);
  const initialTopic =
    (activeTopicId && getAptitudeTopicById(activeTopicId)) ||
    (groupTopics.length > 0 ? groupTopics[0] : allAptitudeTopics[0]);

  const [currentTopicId, setCurrentTopicId] = useState<string>(initialTopic.id);
  const currentTopic = getAptitudeTopicById(currentTopicId) || initialTopic;

  // Store persistence for learned topics
  const learnedTopics = useStore((s) => s.learnedTopics) || [];
  const toggleLearnedTopic = useStore((s) => s.toggleLearnedTopic);
  const isLearned = learnedTopics.includes(currentTopic.id);

  // Collapsed state for worked examples
  const [openExamples, setOpenExamples] = useState<Record<number, boolean>>({});
  const toggleExample = (idx: number) => {
    setOpenExamples((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Etiquette quiz state (for hr-basics)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const handleSelectUnit = (topicId: string) => {
    setCurrentTopicId(topicId);
    setOpenExamples({});
    if (onSelectTopic) onSelectTopic(topicId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Formula section title based on topic group
  const getFormulaSectionTitle = () => {
    switch (currentTopic.group) {
      case "logical":
        return "Methods & rules";
      case "verbal":
        return "Rules & principles";
      case "interview":
        return "Frameworks & strategies";
      default:
        return "Formulas & methods";
    }
  };

  const difficultySymbol = (level: string) => {
    switch (level) {
      case "Easy":
        return "○ Easy";
      case "Hard":
        return "● Hard";
      default:
        return "◐ Medium";
    }
  };

  return (
    <div className="learn-container flex flex-col lg:flex-row gap-8 items-start w-full">
      {/* Sidebar: In this path */}
      <aside className="learn-sidebar w-full lg:w-72 shrink-0 bg-surface border border-border rounded-2xl p-4 shadow-sm print:hidden">
        <div className="text-xs uppercase font-semibold tracking-wider text-muted mb-3 px-2 flex items-center justify-between">
          <span>IN THIS PATH</span>
          <span className="font-mono text-[11px] text-ink-2">
            {groupTopics.filter((t) => learnedTopics.includes(t.id)).length}/{groupTopics.length} learned
          </span>
        </div>
        <nav className="flex flex-col gap-1 max-h-[75vh] overflow-y-auto pr-1">
          {groupTopics.map((t, idx) => {
            const active = t.id === currentTopic.id;
            const learned = learnedTopics.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => handleSelectUnit(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-all ${
                  active
                    ? "surface-inverse bg-accent text-on-accent shadow-[2px_2px_0px_#0A0A0A]"
                    : "text-ink-2 hover:bg-surface-2"
                }`}
              >
                <span
                  className={`font-mono text-xs w-5 text-right ${
                    active ? "text-on-accent" : "text-muted"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="truncate flex-1">{t.title}</span>
                {learned && (
                  <CheckCircle2
                    size={14}
                    className={active ? "text-on-accent" : "text-ink"}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Column */}
      <main className="learn-content-main flex-1 min-w-0 flex flex-col gap-8 w-full">
        {/* Header Block */}
        <header className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <span>Aptitude</span>
              <span>/</span>
              <span className="capitalize">{currentTopic.group}</span>
              <span>/</span>
              <span className="text-ink">{currentTopic.title}</span>
            </div>
            <button
              onClick={() => window.print()}
              className="print-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-ink hover:bg-surface-2 transition-colors print:hidden"
            >
              <Printer size={14} />
              Print cheat sheet
            </button>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-ink tracking-tight mb-2">
              {currentTopic.title}
            </h1>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed">
              {currentTopic.summary}
            </p>
          </div>

          {/* Meta / Context Strip */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-border">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-ink border border-border">
              <Clock size={13} className="text-muted" />
              <span>{currentTopic.context.targetTimePerQuestion}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-ink border border-border">
              <span>{difficultySymbol(currentTopic.context.difficultyLevel)}</span>
            </div>
            {currentTopic.context.prerequisites.map((prereq) => (
              <span
                key={prereq}
                className="px-2.5 py-1 rounded-full text-xs font-mono text-muted bg-surface-3 border border-border"
              >
                {prereq}
              </span>
            ))}
            <label className="ml-auto inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-ink select-none px-3 py-1 bg-surface-2 rounded-full border border-border hover:bg-surface-3 transition-colors print:hidden">
              <input
                type="checkbox"
                checked={isLearned}
                onChange={() => toggleLearnedTopic(currentTopic.id)}
                className="w-4 h-4 rounded border-border-strong text-accent focus:ring-accent accent-accent cursor-pointer"
              />
              <span>{isLearned ? "Marked as learned" : "Mark as learned"}</span>
            </label>
          </div>
        </header>

        {/* Sticky Pill Bar Navigation */}
        <nav className="sticky top-16 z-20 bg-surface/95 backdrop-blur-md border border-border rounded-xl p-1.5 shadow-sm flex items-center gap-1 overflow-x-auto print:hidden">
          <a href="#context" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            Context
          </a>
          <a href="#concepts" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            Concepts
          </a>
          <a href="#formulas" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            {currentTopic.group === "interview" ? "Frameworks" : currentTopic.group === "logical" ? "Methods" : "Formulas"}
          </a>
          {currentTopic.referenceTables && currentTopic.referenceTables.length > 0 && (
            <a href="#tables" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
              Tables
            </a>
          )}
          <a href="#shortcuts-traps" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            Shortcuts & Traps
          </a>
          <a href="#examples" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            Worked Examples
          </a>
          <a href="#oa-questions" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            OA Questions
          </a>
          <a href="#remember" className="px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-surface-2 rounded-lg shrink-0">
            Remember
          </a>
          {onGoToPractice && (
            <button
              onClick={onGoToPractice}
              className="ml-auto px-3 py-1.5 text-xs font-medium surface-inverse bg-accent text-on-accent rounded-lg shrink-0 flex items-center gap-1 hover:bg-accent-hover transition-colors"
            >
              <Target size={13} />
              Practice test
            </button>
          )}
        </nav>

        {/* 1. Context Section */}
        <section id="context" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm scroll-mt-32">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Lightbulb size={16} />
            <span>CONTEXT & APPLICATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold text-ink">Why it matters</h3>
              <p className="text-sm text-ink-2 leading-relaxed">{currentTopic.context.whyItMatters}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold text-ink">Where it appears</h3>
              <p className="text-sm text-ink-2 leading-relaxed">{currentTopic.context.whereItAppears}</p>
            </div>
          </div>
        </section>

        {/* 2. Key Concepts Section */}
        <section id="concepts" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm scroll-mt-32">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <BookOpen size={16} />
            <span>KEY CONCEPTS ({currentTopic.keyConcepts.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTopic.keyConcepts.map((kc, i) => (
              <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-1.5">
                <span className="font-semibold text-sm text-ink">{kc.term}</span>
                <p className="text-xs md:text-sm text-ink-2 leading-relaxed">{kc.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Formulas / Methods & Rules / Frameworks Section */}
        <section id="formulas" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm scroll-mt-32">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Target size={16} />
            <span>{getFormulaSectionTitle().toUpperCase()} ({currentTopic.formulas.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {currentTopic.formulas.map((f: Formula, i: number) => (
              <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium text-muted">0{i + 1}</span>
                  <span className="font-semibold text-sm text-ink flex-1">{f.label}</span>
                </div>
                <div className="p-3 bg-surface border border-border rounded-lg overflow-x-auto">
                  {renderFormulaExpression(f.expression)}
                </div>
                <div className="text-xs text-ink-2">
                  <span className="font-medium text-muted">When to use: </span>
                  {f.whenToUse}
                </div>
                {f.example && (
                  <div className="text-xs text-muted italic bg-surface-3 p-2 rounded-md">
                    <span className="font-medium text-ink-2 not-italic">Example: </span>
                    {f.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 4. Reference Tables Section (if present) */}
        {currentTopic.referenceTables && currentTopic.referenceTables.length > 0 && (
          <section id="tables" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm scroll-mt-32">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span>REFERENCE TABLES</span>
            </div>
            {currentTopic.referenceTables.map((tbl, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-ink">{tbl.title}</h4>
                <div className="overflow-x-auto border border-border rounded-xl">
                  <table className="w-full text-left text-xs md:text-sm">
                    <thead className="bg-surface-2 border-b border-border text-muted font-mono uppercase text-[11px]">
                      <tr>
                        {tbl.headers.map((h, i) => (
                          <th key={i} className="p-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {tbl.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-surface-2/60 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 font-mono text-ink-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 5. Shortcuts & Common Traps */}
        <section id="shortcuts-traps" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-32">
          {/* Shortcuts column */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <CheckCircle2 size={16} className="text-ink" />
              <span>SHORTCUTS ({currentTopic.shortcuts.length})</span>
            </div>
            <div className="flex flex-col gap-4">
              {currentTopic.shortcuts.map((sc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 shrink-0 pt-0.5 text-ink">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-semibold text-ink">{sc.trick}</span>
                    <p className="text-xs text-ink-2 leading-relaxed">{sc.whenItWorks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Traps column */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <XCircle size={16} className="text-ink" />
              <span>COMMON TRAPS ({currentTopic.commonTraps.length})</span>
            </div>
            <div className="flex flex-col gap-4">
              {currentTopic.commonTraps.map((tr, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 shrink-0 pt-0.5 text-ink">
                    <XCircle size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-semibold text-ink">{tr.mistake}</span>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      <span className="font-medium text-muted">Fix: </span>
                      {tr.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Worked Examples */}
        <section id="examples" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm scroll-mt-32">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <BookOpen size={16} />
              <span>FIVE WORKED EXAMPLES (EASY → HARD)</span>
            </div>
            <span className="text-xs text-muted">Try solving first</span>
          </div>

          <div className="flex flex-col gap-3">
            {currentTopic.workedExamples.map((ex, i) => {
              const isOpen = openExamples[i];
              return (
                <div key={i} className="border border-border rounded-xl overflow-hidden bg-surface-2 transition-all">
                  <button
                    onClick={() => toggleExample(i)}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-surface-3/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="font-mono text-xs font-medium text-muted mt-0.5">0{i + 1}</span>
                      <span className="text-sm font-semibold text-ink leading-snug">{ex.question}</span>
                    </div>
                    <div className="shrink-0 flex items-center gap-2 text-xs font-medium text-muted">
                      <span>{isOpen ? "Hide solution" : "Show solution"}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-2 border-t border-border bg-surface flex flex-col gap-3 text-sm">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs uppercase font-mono tracking-wider text-muted">Solution steps:</span>
                        <ol className="list-decimal list-inside space-y-1 text-xs md:text-sm text-ink-2 pl-1">
                          {ex.steps.map((st, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              {st}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="p-2.5 bg-surface-2 border border-border rounded-lg inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-ink">
                        <span className="text-muted font-normal">Answer:</span>
                        <span>{ex.answer}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. OA Examples */}
        <section id="oa-questions" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm scroll-mt-32">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Target size={16} />
            <span>ONLINE ASSESSMENT (OA) EXAMPLES</span>
          </div>
          <div className="flex flex-col gap-4">
            {currentTopic.oaExamples.map((oa, i) => (
              <div key={i} className="p-4 bg-surface-2 border border-border rounded-xl flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-medium text-muted mt-0.5">OA-0{i + 1}</span>
                  <span className="text-sm font-semibold text-ink">{oa.question}</span>
                </div>
                <div className="pl-8 flex flex-col gap-1.5 text-xs text-ink-2">
                  <ul className="list-disc list-inside space-y-0.5">
                    {oa.steps.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                  <div className="font-semibold text-ink mt-1">
                    <span className="text-muted font-normal">Result: </span>
                    {oa.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. "Remember This" Inverse Card */}
        <section id="remember" className="bg-[#0A0A0A] text-white border border-[#0A0A0A] rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-md scroll-mt-32">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BDBDBD]">
            <Sparkles size={16} className="text-white" />
            <span>REMEMBER THIS · HIGH-YIELD TAKEAWAYS</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-sm md:text-base text-white/90">
            {currentTopic.rememberThis.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#BDBDBD] font-mono select-none">▸</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Special Etiquette Quiz (for hr-basics) */}
        {currentTopic.etiquetteQuiz && currentTopic.etiquetteQuiz.length > 0 && (
          <section id="etiquette-quiz" className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <HelpCircle size={16} />
              <span>INTERACTIVE HR ETIQUETTE QUIZ (5 QUESTIONS)</span>
            </div>
            <div className="flex flex-col gap-6">
              {currentTopic.etiquetteQuiz.map((q, qIdx) => {
                const selected = quizAnswers[qIdx];
                const isAnswered = selected !== undefined;
                return (
                  <div key={qIdx} className="p-5 bg-surface-2 border border-border rounded-xl flex flex-col gap-3">
                    <span className="font-semibold text-sm text-ink">
                      {qIdx + 1}. {q.question}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        let btnStyle = "border-border hover:bg-surface-3";
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-accent text-on-accent border-accent font-semibold";
                          } else if (isChosen) {
                            btnStyle = "border-dashed border-border-strong bg-surface text-muted";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`p-3 text-left text-xs md:text-sm rounded-lg border transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <span className="text-xs uppercase font-mono tracking-wider ml-2 shrink-0">✓ Correct</span>
                            )}
                            {isAnswered && isChosen && optIdx !== q.correctIndex && (
                              <span className="text-xs uppercase font-mono tracking-wider ml-2 shrink-0">✕ Incorrect</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswered && (
                      <div className="p-3 bg-surface border border-border rounded-lg text-xs text-ink-2 leading-relaxed">
                        <span className="font-semibold text-ink">Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 9. Next Steps / Related Topics */}
        <section className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm print:hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-ink">Ready to test what you learned?</h3>
              <p className="text-xs md:text-sm text-muted">
                Practice 15 multiple choice questions on {currentTopic.title} under timed conditions.
              </p>
            </div>
            {onGoToPractice ? (
              <button
                onClick={onGoToPractice}
                className="px-5 py-2.5 surface-inverse bg-accent text-on-accent text-sm font-semibold rounded-xl hover:bg-accent-hover transition-all shadow-[2px_2px_0px_#0A0A0A] flex items-center gap-2"
              >
                <span>Practice test</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <Link
                to={`/test/${currentTopic.group}`}
                className="px-5 py-2.5 surface-inverse bg-accent text-on-accent text-sm font-semibold rounded-xl hover:bg-accent-hover transition-all shadow-[2px_2px_0px_#0A0A0A] flex items-center gap-2"
              >
                <span>Practice test</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {currentTopic.relatedTopics && currentTopic.relatedTopics.length > 0 && (
            <div className="pt-4 border-t border-border flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">Related topics:</span>
              {currentTopic.relatedTopics.map((relId) => {
                const rel = getAptitudeTopicById(relId);
                if (!rel) return null;
                return (
                  <button
                    key={relId}
                    onClick={() => handleSelectUnit(relId)}
                    className="px-3 py-1 text-xs font-medium bg-surface-2 text-ink border border-border rounded-lg hover:bg-surface-3 transition-colors"
                  >
                    {rel.title}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
