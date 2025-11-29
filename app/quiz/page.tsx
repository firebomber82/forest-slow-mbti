"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { questions, type MbtiLetter, type Question } from "@/data/questions";

type Counts = Partial<Record<MbtiLetter, number>>;

// 前景 Totem + 背景也共用同一組
const totemImages: string[] = [
  "q1-heart-crystal.png",
  "q2-feather-glow.png",
  "q3-cracked-eye.png",
  "q4-spirit-flower.png",
  "q5-shadow-sigil.png",
  "q6-empathy-wave.png",
  "q7-time-hourglass.png",
  "q8-destiny-rune.png",
  "q9-mirror-whisper.png",
  "q10-astral-wheel.png",
  "q11-emotion-echo.png",
  "q12-will-blade.png",
  "q13-fracture-net.png",
  "q14-order-circle.png",
  "q15-soul-ember.png",
  "q16-forest-guardian.png",
];

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

  const totem = "/" + totemImages[currentIndex];

  // ⭐ 背景 = 放大版 Totem
  const bg = totem;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat relative transition-all duration-700"
      style={{
        backgroundImage: `
          url(${bg}),
          radial-gradient(circle at center, rgba(0,0,0,0.86), rgba(0,0,0,0.97))
        `,
        backgroundBlendMode: "normal, multiply",
      }}
    >
      {/* 漂浮粒子效果 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-200/10 rounded-full blur-xl animate-pulse"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 中央卡片 */}
      <div className="w-full max-w-xl relative backdrop-blur-xl bg-slate-900/65 rounded-3xl border border-slate-700/40 shadow-[0_0_45px_rgba(0,0,0,0.8)] p-6 sm:p-8 transition-all duration-500">
        
        {/* 標題區 */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-300/80 tracking-wide">
          <span className="text-emerald-300/80 uppercase">FOREST TRIAL</span>
          <span>
            問題 {currentIndex + 1} / {total}
          </span>
        </div>

        {/* 進度條 */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 圖騰 */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={totem}
            alt="totem"
            className="w-14 h-14 rounded-full shadow-[0_0_18px_rgba(0,255,255,0.4)]"
          />
          <div className="text-sm text-slate-200 leading-relaxed">
            <p className="font-semibold text-emerald-300/90">MAGIC TOTEM</p>
            <p>{currentQuestion.story.slice(0, 12)} Totem</p>
          </div>
        </div>

        {/* 故事 */}
        <p className="text-slate-200/90 text-sm leading-relaxed mb-4">
          {currentQuestion.story}
        </p>

        {/* 問題 */}
        <h2 className="text-emerald-100 font-semibold text-lg mb-4">
          {currentQuestion.question}
        </h2>

        {/* 選項 */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(opt.value)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="w-full text-left px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 hover:border-teal-400/60 transition-all text-slate-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              {opt.text}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
