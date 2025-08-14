
"use client"

import * as React from "react"
import { Bar, Line, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

// Chart container component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
    children: React.ComponentProps<typeof ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/25 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      )}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: Record<string, any> }) => {
  const { resolvedTheme } = useTheme()
  
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: [
          `[data-chart=${id}] {`,
          ...colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[resolvedTheme || 'light'] || itemConfig.color
            return color ? `  --color-${key}: ${color};` : null
          }).filter(Boolean),
          `}`,
        ].join("\n"),
      }}
    />
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Payload<ValueType, NameType>[]
  label?: string
  indicator?: "dot" | "line" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  labelFormatter?: ((label: any, payload: Payload<ValueType, NameType>[]) => React.ReactNode) | React.ReactNode
  labelClassName?: string
  formatter?: (value: any, name: any, item: any, index: number, payload: any[]) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
  config?: Record<string, any>
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ 
    active, 
    payload, 
    className, 
    indicator = "dot", 
    hideLabel = false, 
    hideIndicator = false, 
    label, 
    labelFormatter, 
    labelClassName, 
    formatter, 
    color, 
    nameKey, 
    labelKey, 
    config = {}, 
    ...props 
  }, ref) => {
  const tooltipPayload = React.useMemo(() => {
    if (active && payload && payload.length) {
      return payload.filter((item, index) => {
        if (
          indicator === "dot" ||
          indicator === "line" ||
          indicator === "dashed"
        ) {
          return true
        }
        return item.value !== undefined && item.value !== null
      })
    }
    return []
  }, [active, payload, indicator])

  if (!active || !tooltipPayload.length) {
    return null
  }

  const nestLabel = tooltipPayload.length === 1 && indicator !== "dot"

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
      {...props}
    >
      {!hideLabel && (
        <div className={cn("grid gap-1.5", !nestLabel && "pb-1.5")}>
          <div
            className={cn(
              "flex w-full flex-wrap items-center gap-0.5",
              nestLabel ? "justify-center text-base" : "justify-between text-xs text-muted-foreground",
              labelClassName
            )}
          >
            {labelFormatter ? (
              typeof labelFormatter === "function" ? (
                labelFormatter(label, tooltipPayload)
              ) : (
                labelFormatter
              )
            ) : (
              label
            )}
          </div>
        </div>
      )}

      {tooltipPayload.length && (
        <div className="grid gap-1.5">
          {tooltipPayload.map((item, index) => {
            const key = `${nameKey || item.dataKey || item.name || "value"}-${index}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload?.fill || item.color

            return (
              <div
                key={key}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.value !== null ? (
                  formatter(item.value, item.name, item, index, tooltipPayload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                        {nestLabel ? (
                          <span className="text-foreground">
                            {item.value}
                          </span>
                        ) : null}
                      </div>
                      {!nestLabel ? (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})
ChartTooltip.displayName = "ChartTooltip"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
    payload?: Array<any>
    verticalAlign?: "top" | "bottom"
  }
>(({ className, payload, verticalAlign = "bottom", config, ...props }, ref) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", className)}
      {...props}
    >
      {payload.map((item) => {
        const key = `${item.dataKey || item.value}-${item.color}`
        const itemConfig = config[item.dataKey as keyof typeof config] || {}

        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}
          >
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{
                backgroundColor: item.color,
              }}
            />
            <span className="text-muted-foreground">
              {itemConfig.label || item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

// Utility functions
const getPayloadConfigFromPayload = (
  config: Record<string, any>,
  payload: unknown,
  key: string
) => {
  if (typeof payload !== "object" || !payload) {
    return undefined
  }

  const payloadPayload = (payload as any).payload

  if (
    payloadPayload &&
    typeof payloadPayload === "object" &&
    "fill" in payloadPayload
  ) {
    return getPayloadConfigFromPayload(config, payloadPayload, key)
  }

  const configLabelKey = Object.keys(config).find((configKey) => {
    return config[configKey]?.label === key
  })

  if (configLabelKey) {
    return config[configLabelKey]
  }

  return config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartStyle,
}
