"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questions from "@/data/questions";

const animations = {
  fadeSlide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
};

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answerArr, setAnswerArr] = useState<string[]>([]);

  const current = questions[step];
  const progress = Math.floor(((step + 1) / questions.length) * 100);

  const handleClick = (dimension: string) => {
    const newArr = [...answerArr, dimension];
    setAnswerArr(newArr);

    if (step + 1 >= questions.length) {
      window.location.href = `/result?a=${JSON.stringify(newArr)}`;
      return;
    }

    setStep(step + 1);
  };

  return (
    <main
      className="
        min-h-screen relative flex items-center justify-center
        text-white overflow-hidden px-6
      "
      style={{
        background: "radial-gradient(circle at center, #08241c, #020b12 70%)",
      }}
    >
      {/* 上方森林插畫 */}
      <img
        src="/bg-forest-top.png"
        className="absolute top-0 left-0 w-full opacity-25 pointer-events-none select-none"
      />

      {/* 下方森林插畫 */}
      <img
        src="/bg-forest-bottom.png"
        className="absolute bottom-0 left-0 w-full opacity-30 blur-[2px] pointer-events-none select-none"
      />

      {/* 主卡片 */}
      <div
        className="
          relative z-10 w-full max-w-2xl
          bg-white/10 backdrop-blur-xl
          border border-emerald-300/40
          rounded-3xl shadow-[0_0_45px_rgba(16,185,129,0.5)]
          p-10
        "
      >
        <div className="text-center text-emerald-200 tracking-widest text-sm mb-4">
          ✦ 第 {step + 1} / {questions.length} 題 ✦
        </div>

        {/* 進度條 */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-emerald-300 to-teal-300 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 題目 + 選項動畫 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={animations.fadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* 題目文字（✔ 使用 current.text） */}
            <h1 className="text-xl font-semibold text-gray-100 mb-6 leading-relaxed text-center drop-shadow-lg">
              {current.text}
            </h1>

            {/* 選項（✔ 使用 op.text + op.dimension） */}
            <div className="space-y-5">
              {current.options.map((op, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClick(op.dimension)}
                  className="
                    w-full py-4 px-6
                    bg-gradient-to-b from-emerald-600/50 to-slate-900/60
                    border border-emerald-300/30
                    rounded-2xl text-gray-100
                    shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                    hover:shadow-[0_10px_40px_rgba(16,185,129,0.45)]
                    hover:border-emerald-300
                    hover:from-emerald-500/60 hover:to-slate-900/70
                    transition-all active:scale-[0.97]
                  "
                >
                  {op.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
