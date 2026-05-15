"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CHART_COLORS = [
  "rgb(30, 99, 255)", // chart-1
  "rgb(83, 136, 255)", // chart-2
  "rgb(136, 173, 255)", // chart-3
  "rgb(189, 210, 255)", // chart-4
  "rgb(11, 27, 43)", // chart-5
];

export interface DonutDatum {
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutDatum[];
  ariaLabel: string;
}

export function DonutChart({ data, ariaLabel }: DonutChartProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="w-full h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            stroke="rgb(255, 255, 255)"
            strokeWidth={2}
            paddingAngle={1}
            isAnimationActive
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value as number}%`}
            contentStyle={{
              borderRadius: 6,
              border: "1px solid rgb(226, 232, 240)",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
              fontSize: 14,
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
