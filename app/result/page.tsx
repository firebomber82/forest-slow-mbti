"use client";

import { useSearchParams } from "next/navigation";
import animalMap from "@/data/animalMap";

function getMBTI(arr: string[]) {
  let count: any = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  arr.forEach((d) => {
    count[d]++;
  });

  const EI = count.E >= count.I ? "E" : "I";
  const SN = count.S >= count.N ? "S" : "N";
  const TF = count.T >= count.F ? "T" : "F";
  const JP = count.J >= count.P ? "J" : "P";

  return EI + SN + TF + JP;
}

export default function ResultPage() {
  const params = useSearchParams();
  const arr = JSON.parse(params.get("a") || "[]");
  const mbti = getMBTI(arr);
  const info = animalMap[mbti];

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#C8D7DD] p-6 overflow-y-auto">
      <div className="w-full max-w-md space-y-8">

        {/* 上面：分析卡 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="text-7xl mb-4">{info.animal}</div>

          <h1 className="text-4xl font-extrabold tracking-wide mb-2">{mbti}</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{info.name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{info.title}</p>

          <div className="bg-[#F1F5F1] rounded-2xl p-4 text-left mb-4">
            <h3 className="font-semibold mb-1">🌿 個性亮點</h3>
            <p className="text-gray-700 text-sm">{info.highlight}</p>
          </div>

          <div className="bg-[#EEF3F4] rounded-2xl p-4 text-left mb-4">
            <h3 className="font-semibold mb-1">🔋 能量來源</h3>
            <p className="text-gray-700 text-sm">{info.energy}</p>
          </div>

          <div className="bg-[#E8ECEE] rounded-2xl p-4 text-left mb-6">
            <h3 className="font-semibold mb-1">💬 代表語錄</h3>
            <p className="text-gray-700 text-sm">{info.quote}</p>
          </div>

          {/* 再測一次按鈕 */}
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-[#4C7D5C] text-white py-3 rounded-2xl hover:opacity-90 transition text-lg"
          >
            再測一次
          </button>
        </div>

        {/* IG 分享卡 */}
        <div className="space-y-3">
          <p className="text-xs text-gray-700 text-center">
            ⬇ 下方是分享卡預覽：截圖即可分享到 IG / 限時動態
          </p>

          <div className="bg-gradient-to-b from-[#182621] to-[#24342E] rounded-3xl p-5 shadow-2xl text-white aspect-[3/4] flex flex-col justify-between">
            
            {/* Logo */}
            <div className="flex justify-between items-center text-xs opacity-90">
              <div className="flex items-center gap-1">
                <span>🌿</span>
                <span className="font-semibold">森林慢慢研究所</span>
              </div>
              <span className="text-[10px] tracking-wide">FOREST SLOW LAB</span>
            </div>

            {/* 中間角色區 */}
            <div className="flex flex-col items-center">
              <div className="text-7xl mb-3">{info.animal}</div>
              <div className="text-sm tracking-[0.3em] mb-1">{mbti}</div>
              <div className="text-xl font-bold mb-1">{info.name}</div>
              <div className="text-xs text-gray-200">{info.title}</div>
            </div>

            {/* 底部亮點 */}
            <div className="space-y-3 text-xs">
              <div className="bg-white/10 rounded-2xl p-3">
                <div className="font-semibold mb-1">🌿 森林人格亮點</div>
                <div className="text-gray-100 text-[11px] leading-relaxed">
                  {info.highlight}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-200">
                <span>mbti.forest-slow.institute</span>
                <span>#森林小動物人格</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
