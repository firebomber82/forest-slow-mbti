"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { questions, type Question } from "@/data/questions";

// 本頁自己定義 MBTI 維度，不再從 questions.ts 匯入
type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
type Counts = Partial<Record<MbtiLetter, number>>;

// 你現有 16 張圖，仍然可以使用；多出來的題目會用 placeholder。
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

// 背景圖：依題號輪流套用 4 張主背景，長度自動 = 題目數
const bgBase = ["bg-forest-top.png", "bg-forest-bottom.png", "core-truth.png", "gate-final.png"];
const bgImages: string[] = Array.from({ length: questions.length }).map(
  (_, i) => bgBase[i % bgBase.length]
);

// ★ 暫時版：把 A/B/C/D 映射成 MBTI 字母（之後你要可再調整）
const answerMap: Record<
  number,
  Record<"A" | "B" | "C" | "D", MbtiLetter>
> = {};

// 簡單地讓所有題目先用同一組映射，之後你想精調我再幫你改配置即可
for (let i = 1; i <= questions.length; i++) {
  answerMap[i] = {
    A: "J", // 偏向結構、規劃
    B: "P", // 偏向彈性、直覺
    C: "F", // 偏向人際、情緒
    D: "T", // 偏向分析、邏輯
  };
}

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<Counts>({} as Counts);

  const total = questions.length;
  const currentQuestion: Question = questions[currentIndex];

  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / total) * 100),
    [currentIndex, total]
  );

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    const qId = currentQuestion.id;
    const mbtiLetter = answerMap[qId]?.[value];

    if (mbtiLetter) {
      setCounts((prev) => ({
        ...prev,
        [mbtiLetter]: (prev[mbtiLetter] ?? 0) + 1,
      }));
    }

    const isLast = currentIndex === total - 1;

    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // 最後一題：計算 MBTI 結果（這裡是暫時版規則）
    const finalCounts: Counts = { ...counts };
    if (mbtiLetter) {
      finalCounts[mbtiLetter] = (finalCounts[mbtiLetter] ?? 0) + 1;
    }

    const pick = (a: MbtiLetter, b: MbtiLetter) =>
      (finalCounts[a] ?? 0) >= (finalCounts[b] ?? 0) ? a : b;

    const result =
      pick("E", "I") +
      pick("S", "N") +
      pick("T", "F") +
      pick("J", "P");

    router.push(`/result?type=${result}`);
  };

  // 目前題目的圖檔與背景（安全 fallback）
  const totemSrc = "/" + (totemImages[currentIndex] ?? "placeholder-logo.png");
  const bgSrc = "/" + (bgImages[currentIndex] ?? "bg-forest-top.png");

  // 把「Q1｜xxx」前綴去掉，拿來當 Totem 小標
  const shortTitle = currentQuestion.question.replace(/^Q\d+｜/, "").slice(0, 12);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgSrc}), radial-gradient(circle at center, rgba(0,0,0,0.88), rgba(0,0,0,0.98))`,
      }}
    >
      {/* 背景漂浮粒子 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 18 }).map((_, i) => (
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

      <div className="w-full max-w-xl relative backdrop-blur-xl bg-slate-900/65 rounded-3xl border border-slate-700/50 shadow-[0_0_45px_rgba(0,0,0,0.9)] p-6 sm:p-8">
        {/* 標頭 */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-300/80 tracking-wide">
          <span className="text-emerald-300/80 uppercase">
            STAR VORTEX TRIAL INSTITUTE
          </span>
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

        {/* 圖騰 + 小標 */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src={totemSrc}
            alt="totem"
            className="w-14 h-14 rounded-full shadow-[0_0_18px_rgba(34,211,238,0.7)] ring-2 ring-cyan-300/60"
          />
          <div className="text-sm text-slate-200 leading-relaxed">
            <p className="font-semibold text-emerald-300/90">
              MAGIC TOTEM
            </p>
            <p className="text-slate-300/80 truncate">
              {shortTitle || "星渦心像測試點"}
            </p>
          </div>
        </div>

        {/* 問題本體 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
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
                  className="w-full text-left px-4 py-3.5 rounded-2xl bg-slate-900/65 border border-slate-700/70 hover:border-teal-400/70 transition-all text-slate-100 shadow-[0_0_20px_rgba(0,0,0,0.65)]"
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
