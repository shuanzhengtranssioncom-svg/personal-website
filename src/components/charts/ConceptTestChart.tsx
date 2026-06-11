"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "方案 A\n（验证优先·3步）",
    count: 5,
    desc: "「像双重认证一样让我放心」",
    color: "#a855f7",
  },
  {
    name: "方案 B\n（效率优先·扫码即走）",
    count: 5,
    desc: "「快且无压力，一步到位」",
    color: "#06b6d4",
  },
];

export default function ConceptTestChart() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-text-muted mb-3">
        内部概念验证测试 · 15 名尼日利亚用户 · 方案偏好分布
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} layout="vertical" barSize={32}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 5]}
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} label={false}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="p-3 rounded-lg border border-border bg-[rgba(255,255,255,0.02)]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-text">
                {item.count} 人选择
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-cyan/5 border border-cyan/10">
        <div className="text-xs text-cyan font-medium mb-1">
          产品决策：融合而非二选一
        </div>
        <div className="text-xs text-text-secondary leading-relaxed">
          测试结果 5:5
          平手后，决定采用方案 B
          的快速流转体验，同时保留方案 A
          的编辑能力——用户可以在扫码后点击编辑修正数字。这既满足了效率需求，也消除了安全感顾虑。
        </div>
      </div>
    </div>
  );
}
