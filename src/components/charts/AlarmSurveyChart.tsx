"use client";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

const painPointData = [
  { name: "高级功能缺乏\n（报时/天气）", value: 28.9, color: "#06b6d4" },
  { name: "铃声种类少", value: 25.5, color: "#a855f7" },
  { name: "闹铃音量\n无法个性化", value: 22.7, color: "#fb7185" },
  { name: "铃声刺耳\n不够温馨", value: 21.3, color: "#f59e0b" },
  { name: "无法个性化定制", value: 19.1, color: "#64748b" },
];

const interestData = [
  { name: "非常感兴趣", value: 61.4, color: "#06b6d4" },
  { name: "有些感兴趣", value: 12.5, color: "#a855f7" },
  { name: "一般", value: 16.2, color: "#64748b" },
  { name: "不太感兴趣", value: 5.4, color: "#475569" },
  { name: "完全不感兴趣", value: 4.6, color: "#334155" },
];

const contentData = [
  { name: "当日天气", value: 36.8, color: "#06b6d4" },
  { name: "当前时间", value: 33.4, color: "#a855f7" },
  { name: "新闻资讯", value: 31.5, color: "#fb7185" },
  { name: "当天日程", value: 31.2, color: "#f59e0b" },
  { name: "未读消息/邮件", value: 27.2, color: "#22d3ee" },
  { name: "待办事项", value: 23.5, color: "#64748b" },
];

export function AlarmPainPointChart() {
  return (
    <div className="space-y-2">
      <div className="text-xs text-text-muted mb-3">
        闹钟功能痛点 TOP 5 · 2092 名用户问卷
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={painPointData} barSize={28}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {painPointData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} fillOpacity={0.75} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              fill="#cbd5e1"
              fontSize={10}
              formatter={(v) => `${v}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AlarmInterestChart() {
  return (
    <div className="space-y-2">
      <div className="text-xs text-text-muted mb-3">
        语音播报功能兴趣度 · 2092 名用户
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={interestData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="rgba(0,0,0,0)"
          >
            {interestData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(15,15,25,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v) => `${v}%`}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* 图例 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {interestData.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[10px] text-text-muted">
              {entry.name} {entry.value}%
            </span>
          </div>
        ))}
      </div>
      <div className="text-xs text-text-secondary text-center mt-2">
        超过七成（73.9%）用户对语音播报表示感兴趣
      </div>
    </div>
  );
}

export function AlarmContentChart() {
  return (
    <div className="space-y-2">
      <div className="text-xs text-text-muted mb-3">
        用户最期望的播报内容 · 多选
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={contentData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="rgba(0,0,0,0)"
          >
            {contentData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(15,15,25,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v) => `${v}%`}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* 图例 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {contentData.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[10px] text-text-muted">
              {entry.name} {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
