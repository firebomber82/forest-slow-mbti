import "./globals.css";

export const metadata = {
  title: "森林慢慢研究所",
  description: "森林小動物 MBTI 性格測驗",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
