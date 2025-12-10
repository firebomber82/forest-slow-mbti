"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { questions, type Question } from "@/data/questions";

// MBTI 字母定義
type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
type Counts = Partial<Record<MbtiLetter, number>>;

// 圖片與背景設定 (維持不變)
const totemImages: string[] = [
  "q1-heart-crystal.png", "q2-feather-glow.png", "q3-cracked-eye.png", "q4-spirit-flower.png",
  "q5-shadow-sigil.png", "q6-empathy-wave.png", "q7-time-hourglass.png", "q8-destiny-rune.png",
  "q9-mirror-whisper.png", "q10-astral-wheel.png", "q11-emotion-echo.png", "q12-will-blade.png",
  "q13-fracture-net.png", "q14-order-circle.png", "q15-soul-ember.png", "q16-forest-guardian.png",
];

const bgBase = ["bg-forest-top.png", "bg-forest-bottom.png", "core-truth.png", "gate-final.png"];
const bgImages: string[] = Array.from({ length: questions.length }).map(
  (_, i) => bgBase[i % bgBase.length]
);

/* -----------------------------------------------------------
   ★ [FIX] 修復計分映射表 (Answer Map)
   這裡我們用簡單的演算法，將題目輪流分配給四個維度，
   確保測驗結果一定會包含 E/I, S/N, T/F, J/P。
----------------------------------------------------------- */
const answerMap: Record<number, Record<"A" | "B" | "C" | "D", MbtiLetter>> = {};

questions.forEach((_, index) => {
  const qNum = index + 1; // 強制使用 1, 2, 3... 序號
  
  // 依題號餘數決定這題測什麼維度
  const mod = qNum % 4;
  
  if (mod === 1) { 
    // 第 1, 5, 9, 13 題：測 E vs I (A/B=E, C/D=I)
    answerMap[qNum] = { A: "E", B: "E", C: "I", D: "I" };
  } else if (mod === 2) { 
    // 第 2, 6, 10, 14 題：測 S vs N (A/B=S, C/D=N)
    answerMap[qNum] = { A: "S", B: "S", C: "N", D: "N" };
  } else if (mod === 3) { 
    // 第 3, 7, 11, 15 題：測 T vs F (A/B=T, C/D=F)
    answerMap[qNum] = { A: "T", B: "T", C: "F", D: "F" };
  } else { 
    // 第 4, 8, 12, 16 題：測 J vs P (A/B=J, C/D=P)
    answerMap[qNum] = { A: "J", B: "J", C: "P", D: "P" };
  }
});

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  // 使用 state 紀錄分數
  const [counts, setCounts] = useState<Counts>({});

  const total = questions.length;
  const currentQuestion: Question = questions[currentIndex];

  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / total) * 100),
    [currentIndex, total]
  );

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    // ★ [FIX] 使用 currentIndex + 1 確保與 answerMap 對應
    const qId = currentIndex + 1;
    const mbtiLetter = answerMap[qId]?.[value];

    // 建立一個新的分數物件 (因為 state 更新是非同步的，我們需要即時的數據)
    const nextCounts = { ...counts };

    if (mbtiLetter) {
      nextCounts[mbtiLetter] = (nextCounts[mbtiLetter] ?? 0) + 1;
      setCounts(nextCounts); // 更新 React State
    } else {
        console.warn(`題目 ${qId} 的選項 ${value} 沒有對應的 MBTI 字母，請檢查 answerMap`);
    }

    const isLast = currentIndex === total - 1;

    if (!isLast) {
      // 還沒結束，下一題
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150); // 稍微延遲一點讓使用者感覺到點擊回饋
      return;
    }

    // --- 最後一題，計算結果 ---
    
    // 定義 helper：比較兩個字母分數，高的勝出 (平手預設取前者)
    const pick = (a: MbtiLetter, b: MbtiLetter) =>
      (nextCounts[a] ?? 0) >= (nextCounts[b] ?? 0) ? a : b;

    const result =
      pick("E", "I") +
      pick("S", "N") +
      pick("T", "F") +
      pick("J", "P");

    console.log("測驗完成！分數統計:", nextCounts);
    console.log("最終結果:", result);

    // ★ [FIX] 確保 result 是有效的字串再跳轉
    if (result && result.length === 4) {
        router.push(`/result?type=${result}`);
    } else {
        // 如果真的算不出來，給一個預設值防止當機 (例如 INTJ)
        console.error("結果計算錯誤，使用預設值");
        router.push(`/result?type=INTJ`);
    }
  };

  // 安全 fallback
  const totemSrc = "/" + (totemImages[currentIndex] ?? "placeholder-logo.png");
  const bgSrc = "/" + (bgImages[currentIndex] ?? "bg-forest-top.png");
  const shortTitle = currentQuestion?.question.replace(/^Q\d+｜/, "").slice(0, 12) || "星渦測試";

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
              {shortTitle}
            </p>
          </div>
        </div>

        {/* 問題本體 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // 使用 currentIndex 作為 key 確保切換時觸發動畫
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h2 className="text-emerald-100 font-semibold text-lg mb-4">
              {currentQuestion?.question}
            </h2>

            {/* 選項 */}
            <div className="space-y-3">
              {currentQuestion?.options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(opt.value as "A" | "B" | "C" | "D")}
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