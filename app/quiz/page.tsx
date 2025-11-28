"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  questions,
  type MbtiLetter,
  type Question,
} from "@/data/questions";

type Counts = Partial<Record<MbtiLetter, number>>;

// 題號對應圖騰圖片 + 題頭小標
const ART_MAP: Record<
  number,
  {
    label: string;
    file: string;
  }
> = {
  1: { label: "心脈召喚石 Totem", file: "/totems/q1-heart-crystal.png" },
  2: { label: "羽落幻光 Totem", file: "/totems/q2-feather-glow.png" },
  3: { label: "裂隙之眼 Totem", file: "/totems/q3-cracked-eye.png" },
  4: { label: "靈念花紋 Totem", file: "/totems/q4-spirit-flower.png" },
  5: { label: "影縫之印 Totem", file: "/totems/q5-shadow-sigil.png" },
  6: { label: "共感之潮 Totem", file: "/totems/q6-empathy-wave.png" },
  7: { label: "時序沙漏 Totem", file: "/totems/q7-time-hourglass.png" },
  8: { label: "命運刻痕 Totem", file: "/totems/q8-destiny-rune.png" },
  9: { label: "鏡像低語 Totem", file: "/totems/q9-mirror-whisper.png" },
  10: { label: "玄兆星輪 Totem", file: "/totems/q10-astral-wheel.png" },
  11: { label: "情感殘響 Totem", file: "/totems/q11-emotion-echo.png" },
  12: { label: "意志之刃 Totem", file: "/totems/q12-will-blade.png" },
  13: { label: "時空裂網 Totem", file: "/totems/q13-fracture-net.png" },
  14: { label: "秩序陣圖 Totem", file: "/totems/q14-order-circle.png" },
  15: { label: "靈魂星火 Totem", file: "/totems/q15-soul-ember.png" },
  16: { label: "森域守護 Totem", file: "/totems/q16-forest-guardian.png" },
};

type DimensionCode = "EI" | "SN" | "TF" | "JP";

const dimensionVisuals: Record<
  DimensionCode,
  {
    vignetteClass: string;
    particleClass: string;
    cardGlowClass: string;
  }
> = {
  EI: {
    vignetteClass:
      "bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.35),_transparent)]",
    particleClass: "bg-emerald-300/90",
    cardGlowClass: "shadow-[0_0_60px_rgba(16,185,129,0.55)]",
  },
  SN: {
    vignetteClass:
      "bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_transparent)]",
    particleClass: "bg-sky-300/90",
    cardGlowClass: "shadow-[0_0_60px_rgba(56,189,248,0.55)]",
  },
  TF: {
    vignetteClass:
      "bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.35),_transparent)]",
    particleClass: "bg-rose-300/90",
    cardGlowClass: "shadow-[0_0_70px_rgba(244,114,182,0.65)]",
  },
  JP: {
    vignetteClass:
      "bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.35),_transparent)]",
    particleClass: "bg-indigo-300/90",
    cardGlowClass: "shadow-[0_0_70px_rgba(129,140,248,0.65)]",
  },
};

type CountsState = Partial<Record<MbtiLetter, number>>;

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<CountsState>({});

  const total = questions.length;
  const currentQuestion: Question = questions[currentIndex];
  const art = ART_MAP[currentQuestion.id] ?? ART_MAP[1];

  const dimCode = (currentQuestion.dimension as DimensionCode) ?? "EI";
  const dimVis = dimensionVisuals[dimCode];

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
      pick("E", "I") + pick("S", "N") + pick("T", "F") + pick("J", "P");

    router.push(`/result?type=${result}`);
  };

  const isChaosPhase =
    currentQuestion.dimension === "TF" || currentQuestion.dimension === "JP";
  const isBetrayal = currentQuestion.id === 12;
  const isFinal = currentQuestion.id === 16;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-slate-100 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* ===== 背景森林層 ===== */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <motion.div
          className="absolute inset-x-0 -top-10 opacity-80"
          animate={{ y: [0, -10, 0], x: [-6, 6, -6] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img
            src="/bg-forest-top.png"
            alt="forest top"
            className="w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 -bottom-10 opacity-80"
          animate={{ y: [0, 10, 0], x: [4, -4, 4] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img
            src="/bg-forest-bottom.png"
            alt="forest bottom"
            className="w-full object-cover"
          />
        </motion.div>

        {/* 維度色彩暈光 */}
        <motion.div
          className={`absolute inset-0 ${dimVis.vignetteClass}`}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: isChaosPhase ? 0.9 : 0.6 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* ===== 粒子層 ===== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: isChaosPhase ? 1 : 0.7 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className={`absolute w-2 h-2 rounded-full blur-sm ${dimVis.particleClass}`}
          initial={{ x: "18%", y: "80%", opacity: 0.4 }}
          animate={{
            y: ["80%", "20%", "70%"],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className={`absolute w-2.5 h-2.5 rounded-full blur-sm ${dimVis.particleClass}`}
          initial={{ x: "78%", y: "88%", opacity: 0.3 }}
          animate={{
            y: ["88%", "25%", "90%"],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 11, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      {/* ===== 卡片區 ===== */}
      <motion.div
        className="w-full max-w-xl relative z-10"
        animate={{
          y:
            currentQuestion.id <= 4
              ? [0, 4, 0]
              : currentQuestion.id <= 8
              ? [-1, 3, -1]
              : currentQuestion.id <= 12
              ? [-2, 4, -2]
              : [-1, 3, -1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      >
        <motion.div
          className={`relative rounded-3xl border border-slate-700/80 bg-slate-950/90 backdrop-blur-xl overflow-hidden ${dimVis.cardGlowClass}`}
          animate={{
            x: isBetrayal ? [0, -5, 5, -4, 4, 0] : 0,
            rotate: isBetrayal ? [-1.2, 1.2, -0.8, 0.8, 0] : 0,
            scale: isFinal ? [1, 1.01, 1] : 1,
          }}
          transition={{
            duration: isBetrayal ? 0.8 : isFinal ? 3 : 0.8,
            repeat: isBetrayal ? 1 : 0,
          }}
        >
          {/* 每題的圖騰大背景 */}
          <motion.img
            src={art.file}
            alt={art.label}
            className="absolute inset-0 w-full h-full object-cover opacity-25 blur-3xl"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.25 }}
            transition={{ duration: 0.6 }}
          />

          {/* Final 題命運光暈 */}
          {isFinal && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,249,222,0.35),_transparent)] mix-blend-screen"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.8, 0.4, 1, 0.3] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          )}

          {/* 進度條 */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-700/60 relative z-10 bg-slate-950/80">
            <div className="flex items-center justify-between text-xs text-slate-300/80">
              <span className="tracking-[0.18em] uppercase text-emerald-300/80">
                FOREST TRIAL
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

          {/* 內容 */}
          <div className="px-6 py-6 sm:py-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400/80">
                  <span className="px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300/90 bg-emerald-500/5">
                    艾拉辛・失落血脈試煉
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-slate-600/60 text-slate-300/80 bg-slate-800/70">
                    維度：{currentQuestion.dimension}
                  </span>
                </div>

                {/* 小圖騰區 */}
                <motion.div
                  className="flex items-center gap-3 mt-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, duration: 0.3 }}
                >
                  <motion.div
                    className="h-12 w-12 rounded-full border border-teal-300/70 bg-slate-900/95 shadow-[0_0_20px_rgba(45,212,191,0.8)] overflow-hidden flex items-center justify-center"
                    animate={{
                      y: [0, -4, 0],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={art.file}
                      alt={art.label}
                      className="h-10 w-10 object-contain"
                    />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400/80">
                      MAGIC TOTEM
                    </span>
                    <span className="text-xs text-slate-100">
                      {art.label}
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                  className="text-sm leading-relaxed text-slate-200/90 mt-1"
                >
                  {currentQuestion.story}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.3 }}
                  className="text-base sm:text-lg font-semibold text-emerald-100 mt-2"
                >
                  {currentQuestion.question}
                </motion.h2>

                <div className="mt-4 space-y-3">
                  {currentQuestion.options.map((opt, idx) => (
                    <motion.button
                      key={opt.value + idx}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97, y: 0 }}
                      onClick={() => handleSelect(opt.value)}
                      className="w-full text-left px-4 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/95 border border-slate-700/90 hover:border-teal-400/80 transition-all duration-200 shadow-[0_18px_30px_rgba(0,0,0,0.85)]"
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
        </motion.div>
      </motion.div>
    </div>
  );
}
