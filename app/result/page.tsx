"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 👈 必須引入 Suspense

type MbtiCode =
  | "INTJ" | "INFJ" | "INTP" | "INFP"
  | "ISTJ" | "ISFJ" | "ISTP" | "ISFP"
  | "ENTJ" | "ENFJ" | "ENTP" | "ENFP"
  | "ESTJ" | "ESFJ" | "ESTP" | "ESFP";

type SectionKey = "core" | "work" | "relation" | "shadow" | "growth";

type Profile = {
  code: MbtiCode;
  archetype: string;
  title: string;
  tagline: string;
  keywords: string[];
  palette: {
    primary: string;
    secondary: string;
  };
  sections: Record<SectionKey, string>;
};

/* -----------------------------------------
   16 型人格資料庫
------------------------------------------ */

const MBTI_PROFILES: Record<MbtiCode, Profile> = {
  INTJ: {
    code: "INTJ",
    archetype: "星界策士",
    title: "INTJ｜星界策士",
    tagline: "把混沌收斂成路徑圖的人。",
    keywords: ["戰略視角", "長期佈局", "獨立思考"],
    palette: { primary: "#4f46e5", secondary: "#22d3ee" },
    sections: {
      core: "你習慣先在腦中搭建整個系統，再決定要不要出手。別人還在反應變化，你已經在推演三步以後的結果。",
      work: "適合策略、架構、流程設計、產品思維等需要高視角的位置。",
      relation: "你在關係中追求深度連結，希望彼此能一起成長。你用行動而不是言語表達在乎。",
      shadow: "壓力過大時，容易進入過度控制與自我批判模式，把所有情緒抽離。",
      growth: "練習允許不完美，把想法說出來、而不是只呈現最終結論。",
    },
  },
  INFJ: {
    code: "INFJ",
    archetype: "星辰引路者",
    title: "INFJ｜星辰引路者",
    tagline: "用洞察與溫度替人找到出口。",
    keywords: ["洞察人心", "價值導向", "深度連結"],
    palette: { primary: "#a855f7", secondary: "#38bdf8" },
    sections: {
      core: "你能精準感受到他人的情緒動機，並找到最柔軟的切入點。",
      work: "適合諮商、教育、顧問、品牌、組織發展等與人心有關的工作。",
      relation: "偏好深度連結而非熱鬧社交，願意為在意的人投入許多心力。",
      shadow: "壓力大時會過度共感或極端抽離，忽略自己的需求。",
      growth: "練習把界線放進生活裡，不需要事事成為他人出口。",
    },
  },
  INTP: {
    code: "INTP",
    archetype: "星核解碼者",
    title: "INTP｜星核解碼者",
    tagline: "對系統的好奇比對人更強烈。",
    keywords: ["邏輯拆解", "概念建構", "獨立研究"],
    palette: { primary: "#38bdf8", secondary: "#6366f1" },
    sections: {
      core: "你喜歡把複雜問題拆到本質，找到真正合理的模型。",
      work: "適合研究、產品、架構設計、數據邏輯。",
      relation: "在關係中重視共同思考，但比較不習慣情緒表達。",
      shadow: "容易卡在腦內模擬而缺乏行動。",
      growth: "把模型寫出來與他人共享，你會被更多人理解。",
    },
  },
  INFP: {
    code: "INFP",
    archetype: "星火織夢師",
    title: "INFP｜星火織夢師",
    tagline: "守護自己相信的故事。",
    keywords: ["價值感", "真誠", "想像力"],
    palette: { primary: "#fb7185", secondary: "#22c55e" },
    sections: {
      core: "你有明確的價值羅盤，也很重視誠實與深度。",
      work: "適合創作、教育、人文、內容、心理領域。",
      relation: "在意的人你會非常用心，但容易放大失望。",
      shadow: "壓力大時會逃避或關閉。",
      growth: "把理想拆成小任務，而不是追求一次完美。",
    },
  },
  ISTJ: {
    code: "ISTJ",
    archetype: "星紋秩序官",
    title: "ISTJ｜星紋秩序官",
    tagline: "讓混亂世界能正常運轉。",
    keywords: ["責任感", "穩定", "制度感"],
    palette: { primary: "#0ea5e9", secondary: "#6b7280" },
    sections: {
      core: "你重視規則與可靠，更信任事實勝過情緒。",
      work: "適合財務、法務、行政、流程管理。",
      relation: "透過行動和穩定感表達在乎。",
      shadow: "壓力大時容易過度僵化與完美主義。",
      growth: "練習留出彈性，不必一次到位。",
    },
  },
  ISFJ: {
    code: "ISFJ",
    archetype: "星光守護者",
    title: "ISFJ｜星光守護者",
    tagline: "溫柔地接住每一個墜落的細節。",
    keywords: ["細膩", "奉獻", "務實"],
    palette: { primary: "#2dd4bf", secondary: "#f472b6" },
    sections: {
      core: "你總是默默記得別人的需求，並用具體行動照顧大家。",
      work: "適合醫療、行政、人力資源、社工、教育。",
      relation: "你是最忠誠的夥伴，但常因為不敢拒絕而受委屈。",
      shadow: "過度承擔別人的責任，最後爆發或崩潰。",
      growth: "你的付出很珍貴，請留一份給自己。",
    },
  },
  ISTP: {
    code: "ISTP",
    archetype: "星軌修復師",
    title: "ISTP｜星軌修復師",
    tagline: "用雙手與邏輯解決眼前的故障。",
    keywords: ["技術流", "冷靜", "實用主義"],
    palette: { primary: "#f59e0b", secondary: "#475569" },
    sections: {
      core: "你喜歡分析事物的運作原理，並能在危機中保持冷靜。",
      work: "適合工程、技術、運動、急診、數據分析。",
      relation: "你需要很多個人空間，喜歡並肩作戰勝過情感交流。",
      shadow: "無聊時會變得憤世嫉俗或過度冒險。",
      growth: "試著表達你的感受，別人無法讀取你的腦袋。",
    },
  },
  ISFP: {
    code: "ISFP",
    archetype: "星塵藝術家",
    title: "ISFP｜星塵藝術家",
    tagline: "用獨特的美學詮釋世界。",
    keywords: ["美感", "自由", "當下"],
    palette: { primary: "#f43f5e", secondary: "#a78bfa" },
    sections: {
      core: "你對美與和諧有極高的敏銳度，追求自在的生活方式。",
      work: "適合設計、藝術、時尚、烹飪、自由業。",
      relation: "你很溫柔但慢熱，需要被接納真實的樣子。",
      shadow: "壓力大時會變得過度敏感或自我封閉。",
      growth: "練習規劃長遠目標，才不會在隨波逐流中迷失。",
    },
  },
  ENTJ: {
    code: "ENTJ",
    archetype: "星域指揮官",
    title: "ENTJ｜星域指揮官",
    tagline: "為了願景，沒有攻不下的堡壘。",
    keywords: ["領導力", "效率", "意志力"],
    palette: { primary: "#dc2626", secondary: "#facc15" },
    sections: {
      core: "你天生就能看見無效率的地方，並有魄力去重組它。",
      work: "適合高階管理、創業、顧問、金融、法律。",
      relation: "你欣賞強者，喜歡智性交流，較不擅長處理細膩情感。",
      shadow: "過度強勢，無意間碾壓了他人的感受。",
      growth: "學習傾聽，有時候情感連結比效率更重要。",
    },
  },
  ENFJ: {
    code: "ENFJ",
    archetype: "星系共鳴者",
    title: "ENFJ｜星系共鳴者",
    tagline: "讓每個人都發揮潛能的催化劑。",
    keywords: ["感染力", "利他", "導師"],
    palette: { primary: "#16a34a", secondary: "#fcd34d" },
    sections: {
      core: "你極具個人魅力，能輕易凝聚團隊並激勵他人。",
      work: "適合公關、教育、銷售、非營利組織、演講。",
      relation: "你對伴侶非常投入，但容易過度涉入對方的人生。",
      shadow: "為了和諧而犧牲真實，或過度在意他人評價。",
      growth: "接受有些人不想被改變，這不是你的失敗。",
    },
  },
  ENTP: {
    code: "ENTP",
    archetype: "星際辯論家",
    title: "ENTP｜星際辯論家",
    tagline: "顛覆現狀是為了看見更多可能。",
    keywords: ["創新", "機智", "多視角"],
    palette: { primary: "#8b5cf6", secondary: "#ef4444" },
    sections: {
      core: "你反應極快，喜歡挑戰傳統觀點，充滿鬼點子。",
      work: "適合創業、行銷、創新研發、政治、脫口秀。",
      relation: "喜歡能跟你進行智力激盪的伴侶，怕無聊。",
      shadow: "點子太多卻無法執行，容易始亂終棄（對專案）。",
      growth: "練習把一件事情做完，專注力是你的超能力。",
    },
  },
  ENFP: {
    code: "ENFP",
    archetype: "星雲探險家",
    title: "ENFP｜星雲探險家",
    tagline: "在無限的可能性中熱情奔跑。",
    keywords: ["熱情", "創意", "連結"],
    palette: { primary: "#f97316", secondary: "#3b82f6" },
    sections: {
      core: "你對世界充滿好奇，總能將看似無關的事物連結起來。",
      work: "適合行銷、創意總監、記者、活動企劃。",
      relation: "熱情且浪漫，但需要對方給予足夠的新鮮感與肯定。",
      shadow: "容易過度承諾，最後因為做不到而焦慮。",
      growth: "學會拒絕，並建立日常的規律感。",
    },
  },
  ESTJ: {
    code: "ESTJ",
    archetype: "星艦執行官",
    title: "ESTJ｜星艦執行官",
    tagline: "效率與傳統的堅定守護者。",
    keywords: ["執行力", "組織", "邏輯"],
    palette: { primary: "#1e293b", secondary: "#0ea5e9" },
    sections: {
      core: "你做事有條理、講求邏輯與SOP，是團隊的定海神針。",
      work: "適合專案管理、軍警、公務體系、高階行政。",
      relation: "負責且忠誠，喜歡明確的承諾與規劃。",
      shadow: "容易變得專斷獨行，無法接受變通。",
      growth: "練習理解他人的情緒也是一種「數據」，需要被考量。",
    },
  },
  ESFJ: {
    code: "ESFJ",
    archetype: "星光供給者",
    title: "ESFJ｜星光供給者",
    tagline: "確保每個人都被照顧到的管家。",
    keywords: ["熱心", "和諧", "社交"],
    palette: { primary: "#f472b6", secondary: "#fde047" },
    sections: {
      core: "你對他人的需求非常敏銳，是團體中的黏著劑。",
      work: "適合醫療護理、幼教、餐飲服務、人資、秘書。",
      relation: "非常重視家庭與伴侶，會用無微不至的照顧表達愛。",
      shadow: "過度依賴他人的讚美，容易情緒勒索。",
      growth: "你的價值不需要靠取悅他人來證明。",
    },
  },
  ESTP: {
    code: "ESTP",
    archetype: "星際開拓者",
    title: "ESTP｜星際開拓者",
    tagline: "既然想到了，就現在去做。",
    keywords: ["行動派", "冒險", "適應力"],
    palette: { primary: "#ef4444", secondary: "#22c55e" },
    sections: {
      core: "你是活在當下的實踐者，喜歡解決眼前的具體問題。",
      work: "適合業務、談判、消防、特技、創業。",
      relation: "充滿魅力且有趣，但不喜歡被束縛或過度沉重的話題。",
      shadow: "容易衝動行事，缺乏長遠規劃。",
      growth: "在行動前多停三秒，思考一下後果。",
    },
  },
  ESFP: {
    code: "ESFP",
    archetype: "星舞共鳴者",
    title: "ESFP｜星舞共鳴者",
    tagline: "讓當下變得值得記住的人。",
    keywords: ["氛圍製造", "感受力", "表達力"],
    palette: { primary: "#fb7185", secondary: "#facc15" },
    sections: {
      core: "你擅長創造氛圍與體驗，對世界充滿感受。",
      work: "適合服務、活動、社群、表演、旅遊領域。",
      relation: "真誠、熱烈、會讓對方感到被看見。",
      shadow: "壓力大時會用活動或娛樂逃避情緒。",
      growth: "把感受力轉成專業，而不是只靠靈感生活。",
    },
  },
};

/* -----------------------------------------
   工具：取結果
------------------------------------------ */

const fallbackType: MbtiCode = "INTJ";

function getProfileFromParam(raw: string | null): Profile {
  if (!raw) return MBTI_PROFILES[fallbackType];
  // 簡單清理字串
  const cleanRaw = raw.trim().toUpperCase();
  if (cleanRaw in MBTI_PROFILES) {
    return MBTI_PROFILES[cleanRaw as MbtiCode];
  }
  return MBTI_PROFILES[fallbackType];
}

/* -----------------------------------------
   [FIX] 拆分出來的內容組件
   負責讀取 SearchParams 並顯示內容
------------------------------------------ */
function ResultContent() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type");
  const profile = getProfileFromParam(rawType);

  const { primary, secondary } = profile.palette;

  return (
    <div className="relative min-h-screen text-slate-50 overflow-hidden">
      {/* ---- 背景層 1：主背景圖 ---- */}
      <div
        className="pointer-events-none fixed inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url("/core-truth.png")` }}
      />

      {/* ---- 背景層 2：彩色光暈 ---- */}
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 10%, ${secondary}22, transparent 55%),
                            radial-gradient(circle at 80% 80%, ${primary}33, #020617 70%)`,
        }}
      />

      {/* ---- 背景層 3：星光罩層 ---- */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.06),_transparent_65%)]" />

      {/* ---- 主體內容 ---- */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          {/* 標頭 */}
          <HeaderBlock profile={profile} />

          {/* 主要內容卡片 */}
          <ContentCard profile={profile} primary={primary} secondary={secondary} />

          {/* 分享與返回 */}
          <ShareBlock profile={profile} />
        </div>
      </main>
    </div>
  );
}

/* -----------------------------------------
   [FIX] 結果頁主入口
   必須加上 <Suspense> 才能在 Vercel 正常運作
------------------------------------------ */
export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        分析星象中...
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

/* -----------------------------------------
   Component：標頭區塊
------------------------------------------ */

function HeaderBlock({ profile }: { profile: Profile }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/70 bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          <span>Star Vortex Trial Institute</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-50 drop-shadow-[0_0_20px_rgba(15,23,42,0.9)]">
          {profile.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-200/90">
          {profile.archetype}｜{profile.tagline}
        </p>

        <div className="flex flex-wrap gap-2 pt-1 text-xs sm:text-[0.8rem]">
          {profile.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full border border-slate-500/70 bg-slate-900/70 px-2.5 py-1 text-slate-100/90"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-xs text-slate-200/80">
        <span className="rounded-full border border-slate-500/70 bg-slate-900/60 px-3 py-1">
          MBTI 類型：{profile.code}
        </span>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-slate-50/5 px-3 py-1.5 text-xs font-medium text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.8)] ring-1 ring-slate-300/40 backdrop-blur-md hover:bg-slate-50/10 transition"
        >
          再測一次
        </Link>
      </div>
    </div>
  );
}

/* -----------------------------------------
   Component：內文卡片
------------------------------------------ */

function ContentCard({ profile, primary, secondary }: { profile: Profile; primary: string; secondary: string }) {
  return (
    <div className="rounded-3xl border border-slate-500/70 bg-slate-950/75 p-5 sm:p-7 md:p-8 shadow-[0_0_45px_rgba(15,23,42,0.95)] backdrop-blur-xl relative overflow-hidden">
      {/* 內層光暈 */}
      <div
        className="pointer-events-none absolute -inset-1 -z-10 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 0%, ${secondary}22, transparent 55%),
                            radial-gradient(circle at 90% 100%, ${primary}33, transparent 55%)`,
        }}
      />

      <div className="grid gap-6 md:grid-cols-2 md:gap-7">
        <div className="space-y-5 text-sm leading-relaxed text-slate-100/90">
          <SectionBlock title="核心人格機制">{profile.sections.core}</SectionBlock>
          <SectionBlock title="在工作與合作中的天賦">{profile.sections.work}</SectionBlock>
        </div>

        <div className="space-y-5 text-sm leading-relaxed text-slate-100/90">
          <SectionBlock title="在關係與連結中的樣子">{profile.sections.relation}</SectionBlock>
          <SectionBlock title="容易卡住的陰影迴路">{profile.sections.shadow}</SectionBlock>
          <SectionBlock title="給你的成長建議">{profile.sections.growth}</SectionBlock>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   Component：分段內容
------------------------------------------ */

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
        <span className="h-1 w-4 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}

/* -----------------------------------------
   Component：分享區
------------------------------------------ */

function ShareBlock({ profile }: { profile: Profile }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs sm:text-[0.8rem] text-slate-200/80">
        <p>把這份結果當成你的「星渦說明書」：</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>可以分享給朋友，讓他們更理解你。</li>
          <li>也可以當作之後職涯與關係決策的底圖。</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <Link
          href="/"
          className="rounded-full border border-slate-400/70 bg-slate-900/70 px-3 py-1.5 text-slate-100 hover:bg-slate-50/10 transition"
        >
          回到星渦首頁
        </Link>

        <button
          type="button"
          className="rounded-full bg-slate-50/10 px-3 py-1.5 text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.8)] ring-1 ring-slate-300/40 backdrop-blur-md hover:bg-slate-50/20 transition"
          onClick={() => {
            const shareText = `我的 MBTI 結果是【${profile.title}】— ${profile.tagline}\n測測你的靈魂形狀：https://forest-slow-mbti.vercel.app/`;
            navigator.clipboard.writeText(shareText).catch(() => undefined);
            alert("已複製分享文字，可以貼到 IG / LINE ✨");
          }}
        >
          複製分享文字
        </button>
      </div>
    </div>
  );
}