import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "星渦真理試煉所｜MBTI 心靈原型測驗",
  description: "一個沉浸式的 MBTI 探索體驗，通過星渦試煉找回你的靈魂原型。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
