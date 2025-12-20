"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-white px-4"
      style={{
        backgroundImage: "url('/bg-forest-top.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 上層遮罩，確保文字可讀 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 內容 */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-xl">
        {/* 機構名 */}
        <div className="text-xs tracking-widest opacity-80">
          STAR VORTEX TRIAL INSTITUTE
        </div>

        {/* 主標題 */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
          星渦真理試煉所
        </h1>

        {/* 副標 */}
        <p className="text-base md:text-lg opacity-90 leading-relaxed">
          在不確定與選擇之間，
          <br />
          你習慣用什麼方式面對世界？
        </p>

        {/* 巨大渦旋門按鈕 */}
        <button
          onClick={() => router.push("/quiz")}
          className="
            w-[240px] h-[240px]
            md:w-[280px] md:h-[280px]
            rounded-full
            bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800
            shadow-[0_0_80px_rgba(120,90,255,0.6)]
            flex flex-col items-center justify-center
            transition-transform duration-300
            hover:scale-105 active:scale-95
          "
        >
          <div className="text-sm opacity-90 tracking-widest mb-2">
            開始
          </div>
          <div className="text-3xl font-bold tracking-wide">
            試煉
          </div>
          <div className="mt-3 text-xs tracking-[0.25em] opacity-80">
            ENTER THE VORTEX
          </div>
        </button>

        {/* 補充說明 */}
        <div className="text-sm opacity-75 tracking-wide">
          約 5–7 分鐘 ｜ 沒有對錯 ｜ 可隨時中斷
        </div>
      </div>
    </main>
  );
}
