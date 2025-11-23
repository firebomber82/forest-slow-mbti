"use client";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#020617] via-[#02121A] to-black text-white">
      {/* 漂浮光點／螢火蟲層 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute w-72 h-72 bg-emerald-500/10 blur-3xl -top-10 -left-10" />
        <div className="absolute w-80 h-80 bg-teal-400/10 blur-3xl bottom-0 right-0" />
        <div className="absolute w-2 h-2 bg-emerald-300 rounded-full top-1/4 left-10 animate-pulse" />
        <div className="absolute w-2 h-2 bg-lime-300 rounded-full top-1/3 right-16 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 bg-amber-200 rounded-full bottom-1/4 left-1/3 animate-pulse" />
      </div>

      {/* 中央卡片 */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-white/5 via-slate-900/80 to-black/90 shadow-[0_25px_80px_rgba(0,0,0,0.7)] px-7 py-8 flex flex-col items-center gap-6 text-center">
          {/* 標誌區 */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-emerald-300 text-sm tracking-[0.25em] uppercase">
              <span>✦</span>
              <span>FOREST SLOW INSTITUTE</span>
              <span>✦</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide">
              森林慢慢研究所
            </h1>
            <p className="text-xs text-emerald-100/80">
              為你開啟一場專屬的森林人格占卜儀式
            </p>
          </div>

          {/* 森林小動物主角 */}
          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="w-28 h-28 rounded-full bg-gradient-to-b from-emerald-500/40 via-emerald-700/60 to-slate-900 border border-emerald-200/40 shadow-[0_0_40px_rgba(16,185,129,0.6)] flex items-center justify-center">
              <span className="text-5xl">🦊</span>
            </div>
            <div className="text-xs text-emerald-100/90">
              你是屬於哪一位「森林守護者」？
            </div>
          </div>

          {/* 說明文字 */}
          <div className="mt-2 text-xs text-slate-100/80 leading-relaxed">
            透過 16 題情境選擇題，解析你的
            <span className="text-emerald-300 font-semibold mx-1">
              森林小動物 MBTI
            </span>
            —— 找出你在團隊、關係與壓力場景中的天生角色。
          </div>

          {/* CTA 按鈕 */}
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="mt-4 w-full bg-emerald-500 text-slate-950 py-3 rounded-2xl text-base font-semibold tracking-wide shadow-[0_15px_40px_rgba(16,185,129,0.55)] hover:bg-emerald-400 hover:shadow-[0_18px_55px_rgba(16,185,129,0.75)] transition-all duration-200 active:translate-y-[1px]"
          >
            開始儀式 · 測出我的森林人格
          </button>

          {/* 底部小提示 */}
          <div className="mt-3 text-[11px] text-slate-300/80 space-y-1">
            <p>約 3～5 分鐘 · 16 題情境選擇題</p>
            <p className="text-emerald-200/90">
              建議戴上耳機，找一個安靜角落，讓自己慢慢沈進森林。
            </p>
          </div>
        </div>

        {/* 底部品牌列 */}
        <div className="mt-4 text-[10px] text-slate-400 flex justify-between items-center">
          <span>© Forest Slow Institute</span>
          <span>#森林小動物人格 #MBTI</span>
        </div>
      </div>
    </main>
  );
}
