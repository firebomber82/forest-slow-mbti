"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { questions, type MbtiLetter, type Question } from "@/data/questions";

type Counts = Partial<Record<MbtiLetter, number>>;

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<Counts>({});

  const total = questions.length;
  const currentQuestion: Question = questions[currentIndex];

  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / total) * 100),
    [currentIndex, total]
  );

  const handleSelect = (value: MbtiLetter) => {
    setCounts((prev) => ({
      ...prev,
      [value]: (prev[value] ?? 0) + 1,
    }));

    const isLast = currentIndex === total - 1;

    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // 計算 MBTI 結果
    const finalCounts = {
      ...counts,
      [value]: (counts[value] ?? 0) + 1,
    };

    const pick = (a: MbtiLetter, b: MbtiLetter) =>
      (finalCounts[a] ?? 0) >= (finalCounts[b] ?? 0) ? a : b;

    const result =
      pick("E", "I") +
      pick("S", "N") +
      pick("T", "F") +
      pick("J", "P");

    router.push(`/result?type=${result}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl relative">
        {/* 背景光暈 */}
        <div className="pointer-events-none absolute -inset-8 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,235,0.18),_transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent)]" />
        </div>

        {/* 樹影邊框卡片 */}
        <div className="relative rounded-3xl border border-slate-700/80 bg-slate-900/70 backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* 進度條 */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-700/60">
            <div className="flex items-center justify-between text-xs text-slate-300/80">
              <span className="tracking-[0.18em] uppercase text-emerald-300/80">
                Forest Trial
              </span>
              <span>
                問題 {currentIndex + 1} / {total}
              </span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 題目區域 + 動畫 */}
          <div className="px-6 py-6 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* 小標 & 維度 tag */}
                <div className="flex items-center justify-between text-xs text-slate-400/80">
                  <span className="px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300/90 bg-emerald-500/5">
                    黑暗森林・心靈試煉
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-slate-600/60 text-slate-300/80 bg-slate-800/60">
                    維度：{currentQuestion.dimension}
                  </span>
                </div>

                {/* 故事敘事 */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.3 }}
                  className="text-sm leading-relaxed text-slate-200/90"
                >
                  {currentQuestion.story}
                </motion.p>

                {/* 問題本體 */}
                <motion.h2
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                  className="text-base sm:text-lg font-semibold text-emerald-100 mt-2"
                >
                  {currentQuestion.question}
                </motion.h2>

                {/* 選項區塊 */}
                <div className="mt-4 space-y-3">
                  {currentQuestion.options.map((opt, idx) => (
                    <motion.button
                      key={opt.value + idx}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-4 py-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-700/90 hover:border-teal-400/70 transition-all duration-200 shadow-[0_18px_30px_rgba(0,0,0,0.65)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-teal-300 via-emerald-300 to-cyan-200 shadow-[0_0_12px_rgba(45,212,191,0.9)]" />
                        <span className="text-sm leading-relaxed text-slate-100">
                          {opt.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
