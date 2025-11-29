"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const bg = "/core-truth.png"; // 若想改成大門圖，可換成 "/gate-final.png"

  return (
    <div
      className="min-h-screen w-full bg-black text-slate-100 relative overflow-hidden"
      style={{
        backgroundImage: `
          url(${bg}),
          radial-gradient(circle at center, rgba(0,0,0,0.88), rgba(0,0,0,0.98))
        `,
        backgroundBlendMode: "normal, multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 星渦粒子層 */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(26)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-200/10 blur-xl"
            style={{
              width: `${24 + Math.random() * 40}px`,
              height: `${24 + Math.random() * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0.15, y: 10 }}
            animate={{
              opacity: [0.15, 0.6, 0.2],
              y: [-20, 20, -10],
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>

      {/* 星渦環形光暈 */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0.4, scale: 1.05 }}
        animate={{ opacity: [0.4, 0.8, 0.5], scale: [1.05, 1.02, 1.08] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(250,204,21,0.12),_transparent)]" />
      </motion.div>

      {/* 主內容 */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        {/* Hero 區塊 */}
        <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* 左：品牌 & 敘事 */}
          <div className="flex-1 space-y-6">
            <motion.p
              className="text-[11px] tracking-[0.32em] uppercase text-cyan-200/80 mb-1"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              STAR VORTEX TRIAL INSTITUTE
            </motion.p>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-cyan-100 drop-shadow-[0_0_18px_rgba(34,211,238,0.45)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              星渦真理試煉所
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              在宇宙靜默的深處，存在一座無法被完整描繪的光能渦流。  
              傳說，唯有願意凝視自身裂縫的人，才能穿越星渦，看見心靈的真相。  
              每一道選擇，都是你靈魂的投影。
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-cyan-400/90 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.7)] hover:bg-cyan-300 transition-colors"
              >
                開始啟動試煉
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm border border-cyan-300/60 text-cyan-100/90 bg-slate-900/40 hover:bg-slate-800/60 transition-colors"
              >
                先了解星渦是什麼
              </Link>
            </motion.div>

            <motion.p
              className="text-[11px] text-slate-400/80 mt-2"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              「進入星渦，啟動你的真實人格序列。」
            </motion.p>
          </div>

          {/* 右：星渦核心視覺模組 */}
          <motion.div
            className="flex-1 w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* 外圈旋轉環 */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-emerald-300/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              {/* 粒子弧線 */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: [0, 12, -8, 0] }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                <div className="absolute inset-10 rounded-full border border-cyan-200/20 border-dashed" />
                <div className="absolute inset-16 rounded-full border border-emerald-200/10 border-dashed" />
              </motion.div>

              {/* 中央核心光球 */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.04, 0.98, 1.03, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-300 via-emerald-300 to-amber-200 shadow-[0_0_45px_rgba(56,189,248,0.9)]">
                  <div className="absolute inset-3 rounded-full bg-slate-950/70 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(8,145,178,0.9),rgba(45,212,191,0.6),rgba(250,204,21,0.7),rgba(8,145,178,0.9))] mix-blend-screen opacity-60" />
                  <p className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.3em] text-slate-900/80 uppercase">
                    svti
                  </p>
                </div>
              </motion.div>

              {/* 外圍文字 */}
              <div className="absolute -bottom-10 w-full text-center text-[11px] text-slate-300/80 tracking-[0.18em] uppercase">
                soul type · star vortex · trial
              </div>
            </div>
          </motion.div>
        </section>

        {/* About 區塊 */}
        <section
          id="about"
          className="mt-16 sm:mt-20 lg:mt-24 space-y-8 max-w-3xl"
        >
          <motion.h2
            className="text-lg sm:text-xl font-medium text-cyan-100 tracking-wide flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
          >
            <span className="w-8 h-px bg-cyan-300/70" />
            什麼是「星渦真理試煉所」？
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-slate-200/90 leading-relaxed"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            星渦，是一處介於
            <span className="text-cyan-200/90"> 內在意識 </span>
            與
            <span className="text-emerald-200/90"> 宇宙深層結構 </span>
            之間的交界帶。  
            每一個進入星渦的人，會被丟進一段看似故事、卻實際對應人格傾向的試煉流程。
            <br />
            <br />
            在這裡，你面對的不是「標準答案」，而是：
            <br />
            — 你在信任與懷疑之間如何選擇  
            — 你在背叛與受傷之後如何行動  
            — 你在秩序與混沌之間如何站位  
            — 你如何保護、如何遠離、如何放手
          </motion.p>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 text-sm"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/60 p-4 shadow-[0_0_28px_rgba(8,47,73,0.8)]">
              <p className="text-xs text-cyan-200/90 tracking-[0.18em] uppercase mb-2">
                SOUL TRIAL
              </p>
              <p className="text-slate-100/90">
                16 種靈魂序列（MBTI
                對應）不是貼標籤，而是描述你在「真實情境」中，慣用的決策模式與保護機制。
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/30 bg-slate-900/60 p-4 shadow-[0_0_28px_rgba(6,78,59,0.8)]">
              <p className="text-xs text-emerald-200/90 tracking-[0.18em] uppercase mb-2">
                NARRATIVE DESIGN
              </p>
              <p className="text-slate-100/90">
                題目不是單選題，而是一段持續推進的劇情。  
                每一次「你想怎麼做」，都會被渦流記錄，累積成你的心靈軌跡。
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-emerald-400/90 text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.7)] hover:bg-emerald-300 transition-colors"
            >
              直接進入星渦試煉
            </Link>
            <p className="text-xs text-slate-400/90">
              建議使用耳機，給自己一小段不被打擾的時間。
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
