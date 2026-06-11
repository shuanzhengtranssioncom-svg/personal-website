"use client";

import Image from "next/image";

export default function PaymentScene() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Image
        src="/james-payment-scene.jpg"
        alt="James，尼日利亚技工，面对商户 OPay 收款码，手动输入 10 位号码时遇到错误提示，面露难色"
        width={1200}
        height={654}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
