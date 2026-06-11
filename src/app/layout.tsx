import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "郑爽 - C端产品经理",
  description:
    "用心理学方法理解用户，用产品方案解决真实问题。传音C端产品经理，千万用户量级产品经验。",
  openGraph: {
    title: "郑爽 - C端产品经理",
    description:
      "用心理学方法理解用户，用产品方案解决真实问题。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
