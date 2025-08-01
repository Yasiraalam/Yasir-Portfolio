"use client"

import type * as React from "react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Define a type for common chart props
type CommonChartProps = {
  data: Record<string, any>[]
  config: ChartConfig
  className?: string
  height?: number
}

// Bar Chart Component
interface BarChartProps extends CommonChartProps {
  barKeys: { key: string; color: string }[]
  xAxisKey: string
}

const CustomBarChart: React.FC<BarChartProps> = ({ data, config, className, height = 300, barKeys, xAxisKey }) => (
  <ChartContainer config={config} className={className} style={{ height }}>
    <BarChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey={xAxisKey}
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <YAxis />
      <ChartTooltip content={<ChartTooltipContent />} />
      {barKeys.map((item) => (
        <Bar key={item.key} dataKey={item.key} fill={`var(--color-${item.color})`} radius={8} />
      ))}
    </BarChart>
  </ChartContainer>
)

// Line Chart Component
interface LineChartProps extends CommonChartProps {
  lineKeys: { key: string; color: string }[]
  xAxisKey: string
}

const CustomLineChart: React.FC<LineChartProps> = ({ data, config, className, height = 300, lineKeys, xAxisKey }) => (
  <ChartContainer config={config} className={className} style={{ height }}>
    <LineChart accessibilityLayer data={data}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey={xAxisKey} tickLine={false} tickMargin={10} axisLine={false} />
      <YAxis />
      <ChartTooltip content={<ChartTooltipContent />} />
      {lineKeys.map((item) => (
        <Line
          key={item.key}
          dataKey={item.key}
          type="monotone"
          stroke={`var(--color-${item.color})`}
          strokeWidth={2}
          dot={false}
        />
      ))}
    </LineChart>
  </ChartContainer>
)

// Pie Chart Component
interface PieChartProps extends CommonChartProps {
  nameKey: string
  dataKey: string
}

const CustomPieChart: React.FC<PieChartProps> = ({ data, config, className, height = 300, nameKey, dataKey }) => (
  <ChartContainer config={config} className={className} style={{ height }}>
    <PieChart>
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        innerRadius={60}
        strokeWidth={5}
        activeShape={({
          outerRadius = 0,
          fill = "",
          ...props
        }: {
          outerRadius?: number
          fill?: string
          [key: string]: any
        }) => (
          <g>
            <circle cx={props.cx} cy={props.cy} r={outerRadius + 10} fill={fill} stroke="none" />
            <path d={props.d} fill={fill} />
          </g>
        )}
      />
      <Legend />
    </PieChart>
  </ChartContainer>
)

export { CustomBarChart, CustomLineChart, CustomPieChart }
