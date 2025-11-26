"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  questions,
  type MbtiLetter,
  type Question,
} from "@/data/questions";

// 每一題專屬的魔法圖騰 + 背景氛圍
const questionVisuals: Record<
  number,
  {
    label: string;
    icon: string; // public 底下的路徑
    aura: string; // Tailwind gradient class 組合
  }
> = {
  1: {
    label: "心脈召喚石 Totem",
    icon: "/totems/q1-light-deer.png",
    aura: "from-emerald-950 via-slate-950 to-slate-950",
  },
  2: {
    label: "光鹿低語 Totem",
    icon: "/totems/q2-whispering-tree.png",
    aura: "from-teal-900 via-slate-950 to-slate-950",
  },
  3: {
    label: "秩序守衛徽章 Totem",
    icon: "/totems/q3-warden-helm.png",
    aura: "from-cyan-900 via-slate-950 to-slate-950",
  },
  4: {
    label: "影界獵人號角 Totem",
    icon: "/totems/q4-hunter-horn.png",
    aura: "from-slate-950 via-emerald-950 to-slate-950",
  },
  5: {
    label: "巨獸幻象符印 Totem",
    icon: "/totems/q5-rune-beast.png",
    aura: "from-indigo-950 via-slate-950 to-slate-950",
  },
  6: {
    label: "霧心鹿岔路 Totem",
    icon: "/totems/q6-mist-stag.png",
    aura: "from-sky-950 via-slate-950 to-slate-950",
  },
  7: {
    label: "符文狐謎語 Totem",
    icon: "/totems/q7-rune-fox.png",
    aura: "from-violet-950 via-slate-950 to-slate-950",
  },
  8: {
    label: "時裂獸預兆 Totem",
    icon: "/totems/q8-time-beast.png",
    aura: "from-fuchsia-950 via-slate-950 to-slate-950",
  },
  9: {
    label: "精靈預言卷軸 Totem",
    icon: "/totems/q9-elf-quill.png",
    aura: "from-emerald-950 via-slate-950 to-slate-950",
  },
  10: {
    label: "獸人戰痕 Totem",
    icon: "/totems/q10-orc-crest.png",
    aura: "from-red-950 via-slate-950 to-slate-950",
  },
  11: {
    label: "黑影契約 Totem",
    icon: "/totems/q11-shadow-seal.png",
    aura: "from-slate-950 via-purple-950 to-slate-950",
  },
  12: {
    label: "破碎法陣 Totem",
    icon: "/totems/q12-broken-sigil.png",
    aura: "from-rose-950 via-slate-950 to-slate-950",
  },
  13: {
    label: "秩序之環 Totem",
    icon: "/totems/q13-order-ring.png",
    aura: "from-amber-950 via-slate-950 to-slate-950",
  },
  14: {
    label: "失控混沌 Totem",
    icon: "/totems/q14-chaos-beast.png",
    aura: "from-orange-950 via-slate-950 to-slate-950",
  },
  15: {
    label: "預言之門 Totem",
    icon: "/totems/q15-prophecy-gate.png",
    aura: "from-indigo-950 via-slate-950 to-slate-950",
  },
  16: {
    label: "平衡審判 Totem",
    icon: "/totems/q16-balance-scale.png",
    aura: "from-emerald-950 via-teal-950 to-slate-950",
  },
};

type Counts = Partial<Record<MbtiLetter, number>>;

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState<Counts>({});

  const total = questions.length;
  const currentQuestion: Question = questions[currentIndex];
  const visuals = questionVisuals[currentQuestion.id] ?? {
    label: "未知圖騰",
    icon: "/totems/q1-light-deer.png",
    aura: "from-slate-950 via-slate-950 to-slate-950",
  };

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

    // 最後一題：計算 MBTI 結果
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

  const auraClass = visuals.aura;
  const dim = currentQuestion.dimension;

  const isChaosPhase = dim === "JP" || dim === "TF";
  const isBetrayal = currentQuestion.id === 12;
  const isFinal = currentQuestion.id === 16;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${auraClass} text-slate-100 flex items-center justify-center px-4 py-10 relative overflow-hidden`}
    >
      {/* ===== 全局森林背景層 ===== */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        {/* 上方森林：緩慢飄動 */}
        <motion.div
          className="absolute inset-x-0 -top-10 opacity-70"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 18,
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

        {/* 下方森林：反向飄動 */}
        <motion.div
          className="absolute inset-x-0 -bottom-10 opacity-70"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 20,
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

        {/* 中央淡霧層 */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,118,110,0.25),_transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isChaosPhase ? 0.7 : 0.45 }}
          transition={{ duration: 1 }}
        />

        {/* 斜向光束 */}
        <motion.div
          className="absolute -left-40 -top-40 h-80 w-80 bg-gradient-to-br from-teal-400/15 via-cyan-300/8 to-transparent blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
            rotate: [0, 8, -4, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute -right-40 bottom-[-120px] h-80 w-80 bg-gradient-to-tr from-emerald-400/15 via-sky-300/8 to-transparent blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -15, 0],
            rotate: [0, -6, 3, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* 最終命運之門額外光束 */}
        {isFinal && (
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,250,210,0.32),_transparent)] mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.6, 0.2, 0.7, 0.25] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        )}
      </div>

      {/* ===== 螢火蟲 / 粒子層 ===== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: isChaosPhase ? 0.9 : 0.6 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-teal-300/80 blur-sm"
          initial={{ x: "10%", y: "80%", opacity: 0.4 }}
          animate={{
            y: ["80%", "20%", "70%"],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-cyan-300/80 blur-sm"
          initial={{ x: "75%", y: "90%", opacity: 0.3 }}
          animate={{
            y: ["90%", "30%", "85%"],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 11, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/80 blur-[1px]"
          initial={{ x: "40%", y: "10%", opacity: 0.5 }}
          animate={{
            y: ["10%", "60%", "15%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.div>

      {/* ===== 卡片容器（帶整體微呼吸） ===== */}
      <motion.div
        className="w-full max-w-xl relative z-10"
        animate={{
          y: isChaosPhase ? [-1, 1, -1] : [0, 1, 0],
        }}
        transition={{
          duration: isChaosPhase ? 5 : 9,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        {/* 背叛題：進場時有輕微晃動 */}
        <motion.div
          className="relative rounded-3xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          animate={{
            boxShadow: isChaosPhase
              ? "0 0 80px rgba(34,197,94,0.45)"
              : "0 0 55px rgba(15,23,42,0.9)",
            x: isBetrayal ? [0, -3, 3, -2, 2, 0] : 0,
            rotate: isBetrayal ? [-0.6, 0.6, -0.3, 0.3, 0] : 0,
          }}
          transition={{
            duration: isBetrayal ? 0.7 : 0.8,
          }}
        >
          {/* Final 題：卡片內部命運光暈 */}
          {isFinal && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,250,255,0.18),_transparent)] mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.7, 0.3, 0.8, 0.25] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          )}

          {/* 進度條 */}
          <div className="px-6 pt-5 pb-3 border-b border-slate-700/60 bg-slate-950/70 relative z-10">
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
          <div className="px-6 py-6 sm:py-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* 標籤 + 維度 */}
                <div className="flex items-center justify-between text-xs text-slate-400/80">
                  <span className="px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300/90 bg-emerald-500/5">
                    艾拉辛・失落血脈試煉
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-slate-600/60 text-slate-300/80 bg-slate-800/60">
                    維度：{currentQuestion.dimension}
                  </span>
                </div>

                {/* 魔法圖騰 */}
                <motion.div
                  className="flex items-center gap-3 mt-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06, duration: 0.3 }}
                >
                  <motion.div
                    className="h-12 w-12 rounded-full border border-teal-300/70 bg-slate-900/90 shadow-[0_0_25px_rgba(45,212,191,0.6)] overflow-hidden flex items-center justify-center"
                    animate={{
                      y: [0, -4, 0],
                      rotate: [-1.5, 1.5, -1.5],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={visuals.icon}
                      alt={visuals.label}
                      className="h-10 w-10 object-contain"
                    />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400/80">
                      Magic Totem
                    </span>
                    <span className="text-xs text-slate-100">
                      {visuals.label}
                    </span>
                  </div>
                </motion.div>

                {/* 故事敘事 */}
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                  className="text-sm leading-relaxed text-slate-200/90 mt-1"
                >
                  {currentQuestion.story}
                </motion.p>

                {/* 問題本體 */}
                <motion.h2
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.3 }}
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
                      className="w-full text-left px-4 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/90 hover:border-teal-400/70 transition-all duration-200 shadow-[0_18px_30px_rgba(0,0,0,0.75)]"
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
