"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mbtiProfiles } from "@/data/resultProfiles";
import type { MbtiType, MbtiProfile } from "@/data/resultProfiles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FALLBACK: MbtiType = "INTJ";

function getProfile(type: string | null): MbtiProfile {
  if (!type) return mbtiProfiles[FALLBACK];
  const key = type.toUpperCase() as MbtiType;
  return mbtiProfiles[key] ?? mbtiProfiles[FALLBACK];
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const profile = getProfile(searchParams.get("type"));

  return (
    <div
      className="min-h-screen px-6 py-12 text-white"
      style={{
        background: `linear-gradient(180deg, ${profile.themeFrom}, ${profile.themeTo})`,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-sm tracking-widest opacity-80">
            STAR VORTEX TRIAL INSTITUTE
          </p>

          <h1 className="text-4xl font-bold">
            {profile.code}｜{profile.name}
          </h1>

          <p className="text-lg opacity-90">{profile.archetype}</p>

          <p className="max-w-xl mx-auto opacity-85">
            {profile.oneLiner}
          </p>

          <Button
            className="mt-6 bg-white/20 hover:bg-white/30 text-white"
            onClick={() => router.replace("/quiz")}
          >
            再測一次
          </Button>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {profile.sections.map((section, idx) => (
            <Card
              key={idx}
              className="bg-white/10 border-white/20 backdrop-blur-md"
            >
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-semibold">
                  {section.title}
                </h2>
                <ul className="list-disc list-inside space-y-2 opacity-90">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <Button
            className="bg-black/30 hover:bg-black/50 text-white"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("結果連結已複製");
            }}
          >
            複製結果連結
          </Button>
        </div>
      </div>
    </div>
  );
}
