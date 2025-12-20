"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

/* ---------------------------------
   背景圖對照表（含保底）
---------------------------------- */

const bgMap: Record<number, string> = {
  1: "/q1-heart-crystal.png",
  2: "/q2-feather-glow.png",
  3: "/q3-cracked-eye.png",
  4: "/q4-spirit-flower.png",
  5: "/q5-shadow-sigil.png",
  6: "/q6-empathy-wave.png",
  7: "/q7-time-hourglass.png",
  8: "/q8-destiny-rune.png",
  9: "/q9-mirror-whisper.png",
  10: "/q10-astral-wheel.png",
  11: "/q11-emotion-echo.png",
  12: "/q12-will-blade.png",
  13: "/q13-fracture-net.png",
  14: "/q14-order-circle.png",
  15: "/q15-soul-ember.png",
  16: "/q16-forest-guardian.png",

  // 👉 後段題目使用「象徵性背景」
  17: "/bg-forest-top.png",
  18: "/bg-forest-top.png",
  19: "/core-truth.png",
  20: "/core-truth.png",
  21: "/gate-final.png",
  22: "/gate-final.png",
  23: "/bg-forest-bottom.png",
  24: "/bg-forest-bottom.png",
};

// 最終保底（萬一哪天超過 24 題）
const FALLBACK_BG = "/bg-forest-top.png";

/* ---------------------------------
   Quiz Page
---------------------------------- */

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const current = questions[index];
  const questionNumber = index + 1;

  const bgImage =
    bgMap[questionNumber] ?? FALLBACK_BG;

  function handleAnswer(value: string) {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (index === questions.length - 1) {
      // ⚠️ 這裡不動你的計算流程
      // 假設你已經有 MBTI 計算結果
      router.push("/result?type=INFJ");
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <section
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-black/60 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full text-white space-y-8">
          <div className="text-center text-sm tracking-widest opacity-80">
            問題 {questionNumber} / {questions.length}
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed">
            {current.question}
          </h1>

          <div className="space-y-4">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left px-6 py-4 rounded-xl bg-white/90 text-black hover:bg-white transition shadow-md"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
