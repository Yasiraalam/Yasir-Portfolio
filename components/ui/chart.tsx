"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Workaround for https://github.com/recharts/recharts/issues/3615
const CartesianGrid = React.forwardRef<SVGSVGElement, React.ComponentProps<typeof RechartsPrimitive.CartesianGrid>>(
  (props, ref) => <RechartsPrimitive.CartesianGrid ref={ref} strokeDasharray="8 8" vertical={false} {...props} />,
)
CartesianGrid.displayName = "CartesianGrid"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentPropsWithoutRef<"div">
>(({ active, payload, className, ...props }, ref) => {
  if (active && payload && payload.length) {
    return (
      <div ref={ref} className={cn("rounded-lg border bg-background p-2 text-sm shadow-md", className)} {...props}>
        {payload.map((item: any) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-x-4">
            {item.name && <span className="text-muted-foreground">{item.name}:</span>}
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & React.ComponentPropsWithoutRef<"div">
>(({ active, payload, className, ...props }, ref) => {
  if (active && payload && payload.length) {
    return (
      <div ref={ref} className={cn("rounded-lg border bg-background p-2 text-sm shadow-md", className)} {...props}>
        {payload.map((item: any) => (
          <div key={item.dataKey} className="flex items-center justify-between gap-x-4">
            {item.name && <span className="text-muted-foreground">{item.name}:</span>}
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    config: {
      [key: string]: {
        label?: string
        color?: string
      }
    }
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId}`

  return (
    <div ref={ref} className={cn("flex aspect-video justify-center text-foreground", className)} {...props}>
      <style>
        {`
          .recharts-tooltip-wrapper {
            outline: none;
          }
          .recharts-default-tooltip {
            padding: 0 !important;
            border: 0 !important;
            border-radius: var(--radius);
            background-color: transparent !important;
            box-shadow: var(--shadow);
          }
          ${Object.entries(config)
            .map(
              ([key, value]) => `
            .chart-${chartId} .recharts-surface path.recharts-dot.dot-${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-legend-item.legend-item-${key} .recharts-legend-item-icon {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-bar-rectangle.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-area-curve.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-dot.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-active-dot.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-reference-area.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-reference-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-reference-dot.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-errorbar-item.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-active-bar.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-active-shape.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-pie-sector.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-radial-bar.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-radar-area.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-radar-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-polar-grid.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-slide.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-bar.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-traveller.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-handle.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-dot.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-dot.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-bar.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-shape.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-pie-sector.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-radial-bar.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-radar-area.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-radar-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-polar-grid.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-reference-area.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-reference-line.${key} {
              stroke: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-reference-dot.${key} {
              fill: ${value.color};
            }
            .chart-${chartId} .recharts-surface .recharts-brush-active-errorbar-item.${key} {
              stroke: ${value.color};
            }
          `,
            )
            .join("")}
        `}
      </style>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: cn(`chart-${chartId}`, child.props.className),
          } as React.SVGProps<SVGSVGElement>)
        }
        return child
      })}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

export { ChartContainer, ChartTooltip, ChartTooltipContent, CartesianGrid }
