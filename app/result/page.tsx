"use client";

import { useSearchParams } from "next/navigation";
import { mbtiProfiles } from "@/data/resultProfiles";
import type { MbtiType, MbtiProfile } from "@/data/resultProfiles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------------------------------
   工具：安全取得 Profile
---------------------------------- */

const FALLBACK: MbtiType = "INTJ";

function getProfile(type: string | null): MbtiProfile {
  if (!type) return mbtiProfiles[FALLBACK];

  const key = type.toUpperCase() as MbtiType;
  return mbtiProfiles[key] ?? mbtiProfiles[FALLBACK];
}

/* ---------------------------------
   Result Page
---------------------------------- */

export default function ResultPage() {
  const searchParams = useSearchParams();
  const profile = getProfile(searchParams.get("type"));

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{
        background: `linear-gradient(180deg, ${profile.themeFrom}, ${profile.themeTo})`,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-10">
        <Header profile={profile} />
        <Sections profile={profile} />
        <Footer />
      </div>
    </div>
  );
}

/* ---------------------------------
   Header
---------------------------------- */

function Header({ profile }: { profile: MbtiProfile }) {
  return (
    <div className="text-center text-white space-y-4">
      <p className="text-sm opacity-80 tracking-widest">
        STAR VORTEX TRIAL INSTITUTE
      </p>

      <h1 className="text-4xl font-bold">
        {profile.code}｜{profile.name}
      </h1>

      <p className="text-lg opacity-90">{profile.archetype}</p>

      <p className="text-base opacity-80 max-w-xl mx-auto">
        {profile.oneLiner}
      </p>

      <Button
        variant="outline"
        className="mt-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
        onClick={() => (window.location.href = "/")}
      >
        再測一次
      </Button>
    </div>
  );
}

/* ---------------------------------
   Sections
---------------------------------- */

function Sections({ profile }: { profile: MbtiProfile }) {
  return (
    <div className="space-y-6">
      {profile.sections.map((section, idx) => (
        <Card
          key={idx}
          className="bg-white/10 border-white/20 text-white backdrop-blur-md"
        >
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-white/85">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ---------------------------------
   Footer
---------------------------------- */

function Footer() {
  return (
    <div className="text-center pt-6">
      <Button
        className="bg-black/30 text-white hover:bg-black/50"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("結果連結已複製！");
        }}
      >
        複製結果連結
      </Button>
    </div>
  );
}
