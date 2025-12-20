"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

/* ---------------------------------
   背景圖對照（鎖定用）
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
  17: "/bg-forest-top.png",
  18: "/bg-forest-top.png",
  19: "/core-truth.png",
  20: "/core-truth.png",
  21: "/gate-final.png",
  22: "/gate-final.png",
  23: "/bg-forest-bottom.png",
  24: "/bg-forest-bottom.png",
};

const FALLBACK_BG = "/bg-forest-top.png";

/* ---------------------------------
   MBTI 計算
---------------------------------- */
type MBTIKey = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

function calculateMBTI(answers: MBTIKey[]) {
  const score: Record<MBTIKey, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((a) => score[a]++);

  return [
    score.E >= score.I ? "E" : "I",
    score.S >= score.N ? "S" : "N",
    score.T >= score.F ? "T" : "F",
    score.J >= score.P ? "J" : "P",
  ].join("");
}

/* ---------------------------------
   Quiz Page
---------------------------------- */
export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIKey[]>([]);

  const question = questions[index];
  const questionNumber = index + 1;
  const bgImage = bgMap[questionNumber] ?? FALLBACK_BG;

  function handleAnswer(value: MBTIKey) {
    const next = [...answers, value];
    setAnswers(next);

    if (index === questions.length - 1) {
      const result = calculateMBTI(next);
      router.push(`/result?type=${result}`);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <section
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 遮罩 */}
      <div className="min-h-screen bg-black/60 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl text-white space-y-10">

          {/* 進度 */}
          <div className="text-center text-sm tracking-widest opacity-80">
            問題 {questionNumber} / {questions.length}
          </div>

          {/* 題目 */}
          <h1 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed">
            {question.question}
          </h1>

          {/* 選項（強制置中結構） */}
          <div className="flex flex-col items-center gap-4">
            {question.options.map((opt, i) => (
              <button
                key={`${question.id}-${i}`}
                onClick={() => handleAnswer(opt.value)}
                className="
                  w-full max-w-xl
                  px-6 py-4
                  rounded-xl
                  bg-white/90 text-black
                  text-center
                  hover:bg-white
                  transition
                  shadow-md
                "
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
