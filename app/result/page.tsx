// app/result/page.tsx

import type { MbtiType } from "@/data/resultProfiles";
import { mbtiProfiles } from "@/data/resultProfiles";
import Link from "next/link";

type ResultPageProps = {
  searchParams: { type?: string };
};

function normalizeType(value?: string | null): MbtiType | null {
  if (!value) return null;
  const upper = value.toUpperCase() as MbtiType;
  const validTypes: MbtiType[] = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
  ];
  return validTypes.includes(upper) ? upper : null;
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const mbti = normalizeType(searchParams.type);
  const profile = mbti ? mbtiProfiles[mbti] : null;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 px-4">
        <div className="max-w-md w-full bg-slate-900/80 border border-cyan-400/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <h1 className="text-xl font-semibold tracking-wide">
            找不到對應的結果
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            可能是連結已過期，或網址中的{" "}
            <span className="font-mono text-cyan-300">type</span>{" "}
            參數被修改了。
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-sm font-medium text-slate-950 transition-colors"
          >
            回到測驗重新開始
          </Link>
        </div>
      </div>
    );
  }

  const { code, name, archetype, oneLiner, themeFrom, themeTo, sections } =
    profile;

  return (
    <div className="relative min-h-screen text-slate-50 overflow-hidden">
      {/* 背景層：魔法陣 + 漸層星光 */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        {/* 底色 */}
        <div className="absolute inset-0 bg-slate-950" />
        {/* 魔法陣圖：記得 public 裡放的是 gate-final.png */}
        <div className="absolute inset-0 bg-[url('/gate-final.png')] bg-cover bg-center opacity-60 mix-blend-screen" />
        {/* 彩色光暈 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 0%, ${themeFrom}, transparent 60%),
              radial-gradient(circle at 80% 100%, ${themeTo}, transparent 60%)
            `,
          }}
        />
      </div>

      {/* 浮動粒子裝飾 */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-200/12 blur-xl animate-pulse"
            style={{
              width: `${24 + (i % 5) * 8}px`,
              height: `${24 + ((i + 2) % 5) * 8}px`,
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDuration: `${4 + (i % 7)}s`,
              animationDelay: `${i * 0.23}s`,
            }}
          />
        ))}
      </div>

      {/* 內容區 */}
      <main className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-slate-900/75 border border-cyan-300/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl px-6 sm:px-10 py-8 space-y-8">
          {/* 上方標頭 */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.22em] uppercase text-cyan-300/80">
                Star Vortex Trial Institute
              </p>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold tracking-wide">
                  {code}
                </span>
                <span className="text-lg sm:text-xl font-semibold text-cyan-200">
                  {name}
                </span>
                <span className="text-sm sm:text-base text-slate-300/90">
                  {archetype}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-200/90 max-w-2xl">
                {oneLiner}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-400/60 bg-slate-900/80 text-xs text-cyan-100">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                星渦人格解析完成
              </span>
              <Link
                href="/quiz"
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-xs sm:text-sm font-medium text-slate-950 shadow-lg transition-colors"
              >
                再測一次，探索其他人格
              </Link>
            </div>
          </header>

          {/* 分隔線 */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

          {/* 內容區塊 */}
          <section className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
            {/* 左：三大解析區塊 */}
            <div className="space-y-6">
              {sections.map((sec) => (
                <div
                  key={sec.title}
                  className="rounded-2xl bg-slate-900/70 border border-slate-700/70 px-4 sm:px-5 py-4 sm:py-5 shadow-[0_0_25px_rgba(15,23,42,0.9)]"
                >
                  <h2 className="text-sm sm:text-base font-semibold text-cyan-200 mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                    {sec.title}
                  </h2>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-100/90 leading-relaxed">
                    {sec.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-1 text-cyan-300/80">・</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 右：個人摘要 / 分享提示 */}
            <aside className="space-y-5">
              <div className="rounded-2xl bg-slate-900/70 border border-cyan-400/40 px-4 sm:px-5 py-4 shadow-[0_0_25px_rgba(8,47,73,0.9)]">
                <h3 className="text-sm sm:text-base font-semibold text-cyan-200 mb-2">
                  你的星渦指紋
                </h3>
                <p className="text-xs sm:text-sm text-slate-100/90 leading-relaxed">
                  這份結果不是要把你關在類別裡，而是幫你看見：當你很做自己的時候，
                  你傾向如何感受世界、做決定、保護自己，以及默默守護的價值。
                </p>
                <p className="mt-3 text-xs sm:text-[13px] text-slate-300/90 leading-relaxed">
                  當你感到迷惘或懷疑自己時，可以回來看看這裡，提醒自己：
                  你本來就不是要跟所有人一樣，你只是正在尋找最適合自己的軌道。
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 border border-slate-700/70 px-4 sm:px-5 py-4">
                <h3 className="text-sm sm:text-base font-semibold text-cyan-200 mb-2">
                  分享給重要的人
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mb-3">
                  如果你願意，也可以把這個結果分享給你在乎的人——
                  讓他們知道，這就是你看世界與保護自己的方式。
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  🔮 提醒：人格不是限制，而是理解自己的入口。你永遠可以在這份藍圖上，
                  緩慢地、按自己的步調，寫上新的軌道。
                </p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
