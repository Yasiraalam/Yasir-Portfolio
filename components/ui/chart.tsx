"use client"

import { cn } from "@/lib/utils"

import * as React from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CategoricalChartProps } from "recharts/types/component/DefaultTooltipContent"

type ChartLegend = {
  name: string
  color: string
}

type ChartTableProps<TData extends Record<string, any>> = {
  data: TData[]
  config: ChartConfig
  valueFormatter?: (value: number) => string
} & React.ComponentPropsWithoutRef<typeof Table>

function ChartTable<TData extends Record<string, any>>({
  data,
  config,
  valueFormatter = (value) => value.toLocaleString(),
  className,
  ...props
}: ChartTableProps<TData>) {
  const total = React.useMemo(
    () =>
      data.reduce(
        (acc, curr) => {
          for (const key of Object.keys(config)) {
            acc[key] = (acc[key] || 0) + curr[key]
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    [data, config],
  )

  return (
    <Table className={className} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(config).map(([key, item]) => (
          <TableRow key={key}>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </div>
            </TableCell>
            <TableCell className="text-right">{valueFormatter(total[key])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type ChartCrosshairProps = {
  x: number
  y: number
  stroke: string
  orientation: "horizontal" | "vertical"
}

function ChartCrosshair({ x, y, stroke, orientation }: ChartCrosshairProps) {
  return (
    <g>
      {orientation === "vertical" && <line x1={x} y1="0" x2={x} y2="9999" stroke={stroke} strokeDasharray="4 4" />}
      {orientation === "horizontal" && <line x1="0" y1={y} x2="9999" y2={y} stroke={stroke} strokeDasharray="4 4" />}
    </g>
  )
}

type ChartLegendContentProps = {
  config: ChartConfig
} & CategoricalChartProps

function ChartLegendContent({ config, ...props }: ChartLegendContentProps) {
  const { payload } = props
  if (!payload || !payload.length) return null

  return (
    <ul className="flex flex-col gap-2">
      {payload.map((item) => {
        const { value, color } = item
        const legend = config[value as keyof typeof config]

        return (
          <li key={value} className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
            {legend?.label}
          </li>
        )
      })}
    </ul>
  )
}

type ChartActiveLegendContentProps = {
  config: ChartConfig
} & CategoricalChartProps

function ChartActiveLegendContent({ config, ...props }: ChartActiveLegendContentProps) {
  const { payload } = props
  if (!payload || !payload.length) return null

  return (
    <ul className="flex flex-col gap-2">
      {payload.map((item) => {
        const { value, color } = item
        const legend = config[value as keyof typeof config]

        return (
          <li key={value} className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
            {legend?.label}
          </li>
        )
      })}
    </ul>
  )
}

type ChartSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  label?: string
} & React.ComponentPropsWithoutRef<typeof Select>

function ChartSelect({ value, onValueChange, options, label, className, ...props }: ChartSelectProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger className="h-8 w-fit text-xs">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

type ChartTooltipProps = React.ComponentPropsWithoutRef<typeof ChartTooltip> & {
  hideLabel?: boolean
  hideIndicator?: boolean
  valueFormatter?: (value: number) => string
  labelFormatter?: (label: string) => string
}

function ChartTooltipCustom({
  hideLabel = false,
  hideIndicator = false,
  valueFormatter = (value) => value.toLocaleString(),
  labelFormatter = (label) => label,
  ...props
}: ChartTooltipProps) {
  return (
    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          hideLabel={hideLabel}
          hideIndicator={hideIndicator}
          itemFormatter={valueFormatter}
          labelFormatter={labelFormatter}
        />
      }
      {...props}
    />
  )
}

export {
  ChartContainer,
  ChartTooltipCustom as ChartTooltip,
  ChartLegendContent,
  ChartActiveLegendContent,
  ChartSelect,
  ChartTable,
  ChartCrosshair,
}
