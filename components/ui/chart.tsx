"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  type BarProps,
  type LineProps,
  type PieProps,
} from "recharts"
import {
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { ChartContainer as RechartsChartContainer } from "@tremor/react"

// Define types for chart components
type ChartComponent = "BarChart" | "LineChart" | "PieChart"
type ChartElement = "Bar" | "Line" | "Pie"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children?: React.ReactNode
  className?: string
  data: Record<string, any>[]
  height?: number
  width?: number
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  accessibilityDescription?: string
  chartType?: ChartComponent // Default chart type
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      config,
      children,
      className,
      data,
      height = 300,
      width = 500,
      margin = { top: 0, right: 0, bottom: 0, left: 0 },
      accessibilityDescription,
      chartType = "BarChart", // Default chart type
      ...props
    },
    ref,
  ) => {
    const chartComponents: Record<ChartComponent, React.ElementType> = {
      BarChart,
      LineChart,
      PieChart,
    }

    let ChartComponent = chartComponents[chartType]

    if (!ChartComponent) {
      console.warn(`Unknown chart type: ${chartType}. Defaulting to BarChart.`)
      ChartComponent = BarChart
    }

    return (
      <RechartsChartContainer
        ref={ref}
        config={config}
        className={cn("min-h-[200px] w-full", className)}
        aria-label={accessibilityDescription}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height}>
          <ChartComponent data={data} margin={margin}>
            {children}
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </ChartComponent>
        </ResponsiveContainer>
      </RechartsChartContainer>
    )
  },
)

Chart.displayName = "Chart"

interface ChartAxisProps extends React.ComponentProps<typeof XAxis> {
  axisType: "x" | "y"
}

const ChartAxis = React.forwardRef<SVGSVGElement, ChartAxisProps>(({ axisType, ...props }, ref) => {
  const AxisComponent = axisType === "x" ? XAxis : YAxis
  return <AxisComponent ref={ref} {...props} />
})
ChartAxis.displayName = "ChartAxis"

interface ChartElementProps {
  type: ChartElement
  dataKey: string
  stroke?: string
  fill?: string
  className?: string
  // Add specific props for each element type
  barProps?: BarProps
  lineProps?: LineProps
  pieProps?: PieProps
}

const ChartElement = React.forwardRef<any, ChartElementProps>(
  ({ type, dataKey, stroke, fill, className, barProps, lineProps, pieProps, ...props }, ref) => {
    switch (type) {
      case "Bar":
        return (
          <Bar
            ref={ref}
            dataKey={dataKey}
            stroke={stroke}
            fill={fill}
            className={cn(className)}
            {...barProps}
            {...props}
          />
        )
      case "Line":
        return (
          <Line
            ref={ref}
            dataKey={dataKey}
            stroke={stroke}
            fill={fill}
            className={cn(className)}
            {...lineProps}
            {...props}
          />
        )
      case "Pie":
        return (
          <Pie
            ref={ref}
            dataKey={dataKey}
            stroke={stroke}
            fill={fill}
            className={cn(className)}
            {...pieProps}
            {...props}
          />
        )
      default:
        return null
    }
  },
)
ChartElement.displayName = "ChartElement"

export { Chart, ChartAxis, ChartElement }
