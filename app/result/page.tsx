"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* -----------------------------------------
   型別定義
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
   MBTI 資料庫（你已貼過，這裡直接使用）
------------------------------------------ */

declare const MBTI_PROFILES: Record<MbtiCode, Profile>;

/* -----------------------------------------
   安全取用工具（關鍵）
------------------------------------------ */

const FALLBACK_TYPE: MbtiCode = "INTJ";

function getSafeProfile(raw: string | null): Profile {
  if (!raw) return MBTI_PROFILES[FALLBACK_TYPE];

  const normalized = raw.trim().toUpperCase() as MbtiCode;

  return MBTI_PROFILES[normalized] ?? MBTI_PROFILES[FALLBACK_TYPE];
}

/* -----------------------------------------
   Result Page 主體
------------------------------------------ */

export default function ResultPage() {
  const searchParams = useSearchParams();

  // ★ 關鍵修正：安全處理 type
  const rawType = searchParams.get("type");
  const profile = getSafeProfile(rawType);

  const { primary, secondary } = profile.palette;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, ${primary}22 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${secondary}22 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-10 max-w-4xl space-y-10">
        <HeaderBlock profile={profile} />
        <ContentCard profile={profile} primary={primary} secondary={secondary} />
        <ShareBlock profile={profile} />
      </div>
    </div>
  );
}

/* -----------------------------------------
   Header
------------------------------------------ */

function HeaderBlock({ profile }: { profile: Profile }) {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-white/90 text-sm font-medium">
          Star Vortex Trial Institute
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white">
        {profile.title}
      </h1>

      <p className="text-xl md:text-2xl text-white/80">
        {profile.archetype}｜{profile.tagline}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {profile.keywords.map((k) => (
          <Badge key={k} className="bg-white/20 text-white border-white/30">
            {k}
          </Badge>
        ))}
      </div>

      <Button
        variant="outline"
        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
        onClick={() => (window.location.href = "/")}
      >
        再測一次
      </Button>
    </div>
  );
}

/* -----------------------------------------
   內容卡片
------------------------------------------ */

function ContentCard({
  profile,
  primary,
  secondary,
}: {
  profile: Profile;
  primary: string;
  secondary: string;
}) {
  return (
    <Card className="relative bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}
      />

      <div className="relative p-8 grid md:grid-cols-2 gap-8">
        <Section title="核心特質">{profile.sections.core}</Section>
        <Section title="工作適性">{profile.sections.work}</Section>
        <Section title="關係模式">{profile.sections.relation}</Section>
        <Section title="陰影面向">{profile.sections.shadow}</Section>
        <Section title="成長方向">{profile.sections.growth}</Section>
      </div>
    </Card>
  );
}

/* -----------------------------------------
   Section
------------------------------------------ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
        {title}
      </h3>
      <p className="text-white/80 leading-relaxed pl-3">{children}</p>
    </div>
  );
}

/* -----------------------------------------
   分享區塊
------------------------------------------ */

function ShareBlock({ profile }: { profile: Profile }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
      <h3 className="text-center text-lg font-semibold text-white mb-4">
        你的「星渦型格」已生成 ✦
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={() => (window.location.href = "/")}
        >
          回到首頁
        </Button>

        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          onClick={() => {
            const text = `我的 MBTI 是 ${profile.title}｜${profile.tagline}`;
            navigator.clipboard.writeText(text);
            alert("已複製分享文字！");
          }}
        >
          複製分享文字
        </Button>
      </div>
    </Card>
  );
}
