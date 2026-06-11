"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const errorData = [
  { name: "遇到过错误", value: 65 },
  { name: "未遇到", value: 35 },
];

const frequencyData = [
  { name: "1-3 次", value: 60, fill: "#06b6d4" },
  { name: "3-4 次", value: 30, fill: "#a855f7" },
  { name: "5-6 次", value: 10, fill: "#fb7185" },
];

export function ErrorRateChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={errorData}
              cx="50%"
              cy="50%"
              innerRadius={34}
              outerRadius={54}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="#06b6d4" />
              <Cell fill="rgba(255,255,255,0.06)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-text">65%</span>
          <span className="text-[10px] text-text-muted">用户遇到过</span>
          <span className="text-[10px] text-text-muted">输入错误</span>
        </div>
      </div>
    </div>
  );
}

export function ErrorFrequencyChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={frequencyData} layout="vertical" margin={{ left: 0, right: 40, top: 5, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            width={50}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {frequencyData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v: unknown) => `${v}%`}
              style={{ fill: "#cbd5e1", fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SampleStat() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-cyan/5 border border-cyan/10">
      <span className="text-3xl font-black text-cyan">3,000+</span>
      <div className="text-xs text-text-secondary leading-relaxed">
        <div>真实样本采集</div>
      </div>
    </div>
  );
}
