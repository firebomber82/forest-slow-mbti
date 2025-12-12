"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* -----------------------------------------
   型別
------------------------------------------ */

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
   MBTI Profiles
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
      core: "你習慣先在腦中搭建整個系統，再決定要不要出手。",
      work: "適合策略、架構、流程設計、產品思維等角色。",
      relation: "重視深度連結，用行動而非言語表達在乎。",
      shadow: "壓力大時容易過度控制與自我抽離。",
      growth: "練習把思考過程說出來，而非只給結論。",
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
      core: "你能精準感受他人內在動機。",
      work: "適合諮商、教育、顧問、品牌。",
      relation: "偏好深度關係而非表層互動。",
      shadow: "容易過度共感而忽略自己。",
      growth: "為自己設立界線。",
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
      core: "你熱衷於理解事物背後的模型。",
      work: "適合研究、工程、系統設計。",
      relation: "偏理性，較不擅長情緒表達。",
      shadow: "容易停留在思考而非行動。",
      growth: "把想法實作出來。",
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
      core: "你有清楚的內在價值羅盤。",
      work: "適合創作、人文、心理。",
      relation: "情感投入深，易受傷。",
      shadow: "壓力時傾向逃避。",
      growth: "把理想拆解為可行步驟。",
    },
  },

  ISTJ: {
    code: "ISTJ",
    archetype: "星紋秩序官",
    title: "ISTJ｜星紋秩序官",
    tagline: "讓世界穩定運轉的人。",
    keywords: ["責任感", "制度", "穩定"],
    palette: { primary: "#0ea5e9", secondary: "#6b7280" },
    sections: {
      core: "你重視規則與可靠性。",
      work: "適合財務、行政、法務。",
      relation: "用行動證明承諾。",
      shadow: "容易僵化。",
      growth: "練習彈性。",
    },
  },

  ISFJ: {
    code: "ISFJ",
    archetype: "星光守護者",
    title: "ISFJ｜星光守護者",
    tagline: "默默撐住他人的人。",
    keywords: ["照顧", "穩定", "溫暖"],
    palette: { primary: "#22c55e", secondary: "#f59e0b" },
    sections: {
      core: "你敏銳察覺他人需求。",
      work: "適合照護、人資、教育。",
      relation: "願意長期付出。",
      shadow: "容易忽略自己。",
      growth: "學會說不。",
    },
  },

  ISTP: {
    code: "ISTP",
    archetype: "星械工匠",
    title: "ISTP｜星械工匠",
    tagline: "動手解決問題的人。",
    keywords: ["實作", "冷靜", "分析"],
    palette: { primary: "#6b7280", secondary: "#f97316" },
    sections: {
      core: "你善於實際解題。",
      work: "適合工程、技術。",
      relation: "情感表達較內斂。",
      shadow: "容易抽離。",
      growth: "嘗試說出感受。",
    },
  },

  ISFP: {
    code: "ISFP",
    archetype: "星韻藝術家",
    title: "ISFP｜星韻藝術家",
    tagline: "用美感說話的人。",
    keywords: ["美感", "同理", "真誠"],
    palette: { primary: "#f59e0b", secondary: "#ec4899" },
    sections: {
      core: "你重視真實感受。",
      work: "適合設計、藝術。",
      relation: "溫柔體貼。",
      shadow: "易受批評影響。",
      growth: "建立自我肯定。",
    },
  },

  ENTJ: {
    code: "ENTJ",
    archetype: "星域指揮官",
    title: "ENTJ｜星域指揮官",
    tagline: "把願景變成成果。",
    keywords: ["領導", "策略", "執行"],
    palette: { primary: "#dc2626", secondary: "#f59e0b" },
    sections: {
      core: "你善於整合資源。",
      work: "適合管理、創業。",
      relation: "直接坦率。",
      shadow: "易過於強勢。",
      growth: "練習傾聽。",
    },
  },

  ENFJ: {
    code: "ENFJ",
    archetype: "星河導師",
    title: "ENFJ｜星河導師",
    tagline: "點亮他人的人。",
    keywords: ["引導", "同理", "組織"],
    palette: { primary: "#16a34a", secondary: "#3b82f6" },
    sections: {
      core: "你看見他人潛力。",
      work: "適合教育、培訓。",
      relation: "重視深度連結。",
      shadow: "忽略自己。",
      growth: "自我照顧。",
    },
  },

  ENTP: {
    code: "ENTP",
    archetype: "星爆創新者",
    title: "ENTP｜星爆創新者",
    tagline: "點燃新可能。",
    keywords: ["創新", "辯證", "彈性"],
    palette: { primary: "#8b5cf6", secondary: "#06b6d4" },
    sections: {
      core: "你擅長發想。",
      work: "適合企劃、創業。",
      relation: "喜歡思想交流。",
      shadow: "容易分心。",
      growth: "完成比發想更重要。",
    },
  },

  ENFP: {
    code: "ENFP",
    archetype: "星彩夢想家",
    title: "ENFP｜星彩夢想家",
    tagline: "用熱情感染世界。",
    keywords: ["熱情", "創意", "連結"],
    palette: { primary: "#f59e0b", secondary: "#ec4899" },
    sections: {
      core: "你充滿熱情。",
      work: "適合行銷、內容。",
      relation: "情感豐富。",
      shadow: "情緒起伏。",
      growth: "建立穩定節奏。",
    },
  },

  ESTJ: {
    code: "ESTJ",
    archetype: "星城執行官",
    title: "ESTJ｜星城執行官",
    tagline: "讓計畫落地。",
    keywords: ["管理", "效率", "責任"],
    palette: { primary: "#1d4ed8", secondary: "#059669" },
    sections: {
      core: "你重視秩序。",
      work: "適合營運、行政。",
      relation: "可靠穩定。",
      shadow: "不易變通。",
      growth: "接納不同觀點。",
    },
  },

  ESFJ: {
    code: "ESFJ",
    archetype: "星暖協調者",
    title: "ESFJ｜星暖協調者",
    tagline: "維繫團隊的人。",
    keywords: ["協調", "照顧", "合作"],
    palette: { primary: "#059669", secondary: "#dc2626" },
    sections: {
      core: "你關心群體感受。",
      work: "適合人資、客服。",
      relation: "重視和諧。",
      shadow: "過度迎合。",
      growth: "為自己發聲。",
    },
  },

  ESTP: {
    code: "ESTP",
    archetype: "星動冒險家",
    title: "ESTP｜星動冒險家",
    tagline: "行動派。",
    keywords: ["行動", "彈性", "現實"],
    palette: { primary: "#dc2626", secondary: "#f59e0b" },
    sections: {
      core: "你喜歡立即行動。",
      work: "適合銷售、現場。",
      relation: "重視體驗。",
      shadow: "衝動。",
      growth: "培養長期思考。",
    },
  },

  ESFP: {
    code: "ESFP",
    archetype: "星舞共鳴者",
    title: "ESFP｜星舞共鳴者",
    tagline: "讓當下閃耀。",
    keywords: ["表達", "感受", "魅力"],
    palette: { primary: "#fb7185", secondary: "#facc15" },
    sections: {
      core: "你擅長營造氛圍。",
      work: "適合活動、表演。",
      relation: "真誠熱情。",
      shadow: "逃避情緒。",
      growth: "把感受轉為專業。",
    },
  },
};

/* -----------------------------------------
   Result Page
------------------------------------------ */

const fallback: MbtiCode = "INTJ";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type");
  const type = (rawType?.toUpperCase() as MbtiCode) || fallback;
  const profile = MBTI_PROFILES[type] ?? MBTI_PROFILES[fallback];

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{profile.title}</h1>
          <p className="text-xl text-white/80">
            {profile.archetype}｜{profile.tagline}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {profile.keywords.map(k => (
              <Badge key={k} className="bg-white/20 text-white">
                {k}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="bg-white/10 p-6 space-y-4">
          <Section title="核心特質">{profile.sections.core}</Section>
          <Section title="工作適性">{profile.sections.work}</Section>
          <Section title="關係模式">{profile.sections.relation}</Section>
          <Section title="陰影面向">{profile.sections.shadow}</Section>
          <Section title="成長方向">{profile.sections.growth}</Section>
        </Card>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            再測一次
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `我的 MBTI 是 ${profile.title}｜${profile.tagline}`
              );
              alert("已複製分享文字");
            }}
          >
            複製分享
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-white/80">{children}</p>
    </div>
  );
}
