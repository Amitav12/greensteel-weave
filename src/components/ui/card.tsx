import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-3xl border text-card-foreground transition-all duration-700 transform-gpu group relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white/90 backdrop-blur-xl shadow-xl hover:shadow-2xl border-white/40 hover:scale-105 hover:-translate-y-2",
        
        glass: "bg-white/20 backdrop-blur-2xl border-white/30 shadow-2xl hover:shadow-green-500/30 hover:scale-110 hover:-translate-y-4 hover:bg-white/30 hover:border-white/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        "glass-dark": "bg-black/20 backdrop-blur-2xl border-white/20 shadow-2xl hover:shadow-white/20 hover:bg-black/30 hover:border-white/40 text-white hover:scale-110 hover:-translate-y-4 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        eco: "bg-gradient-to-br from-green-50/80 to-emerald-100/80 backdrop-blur-xl border-green-200/60 shadow-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110 hover:-translate-y-4 hover:from-green-100/90 hover:to-emerald-200/90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        transparent: "bg-transparent backdrop-blur-xl border-green-400/40 hover:bg-green-500/10 hover:border-green-500/60 shadow-xl hover:shadow-2xl hover:shadow-green-500/40 hover:scale-110 hover:-translate-y-4 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        recycled: "bg-gradient-to-br from-green-100/60 to-emerald-200/60 backdrop-blur-xl border-green-300/50 shadow-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110 hover:-translate-y-4 hover:from-green-200/70 hover:to-emerald-300/70 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.15),transparent_70%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        floating: "bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-green-500/40 border-green-100/60 hover:scale-115 hover:-translate-y-6 hover:rotate-1 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/10 before:via-transparent before:to-emerald-400/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        magnetic: "bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-green-500/50 border-green-200/60 hover:scale-125 hover:-translate-y-8 hover:rotate-2 transition-all duration-700 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        neon: "bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-2xl border-2 border-green-400/60 shadow-2xl shadow-green-500/30 hover:shadow-green-500/60 hover:scale-110 hover:-translate-y-4 hover:border-green-300/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:-inset-1 after:bg-gradient-to-br after:from-green-400/50 after:to-emerald-500/50 after:rounded-3xl after:blur-xl after:opacity-0 hover:after:opacity-30 after:transition-opacity after:duration-500 after:-z-10",
        
        holographic: "bg-gradient-to-br from-white/30 via-green-100/20 to-emerald-100/30 backdrop-blur-2xl border border-white/40 shadow-2xl hover:shadow-green-500/40 hover:scale-110 hover:-translate-y-4 before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(34,197,94,0.3)_60deg,transparent_120deg,rgba(16,185,129,0.3)_180deg,transparent_240deg,rgba(34,197,94,0.3)_300deg,transparent_360deg)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700 before:animate-spin before:animation-duration-[3s]",
        
        // Additional Eco-Themed Card Variants
        "eco-leaf": "bg-gradient-to-br from-green-50/70 via-emerald-100/60 to-green-200/50 backdrop-blur-xl border-2 border-green-300/40 shadow-xl hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110 hover:-translate-y-4 hover:from-green-100/80 hover:via-emerald-200/70 hover:to-green-300/60 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M20,50 Q50,20 80,50 Q50,80 20,50\" fill=\"%2322c55e\" opacity=\"0.1\"/></svg>')] before:bg-center before:bg-no-repeat before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        "eco-forest": "bg-gradient-to-br from-green-800/80 via-emerald-700/70 to-green-900/80 backdrop-blur-xl border border-green-600/50 shadow-2xl hover:shadow-green-900/60 text-green-100 hover:scale-110 hover:-translate-y-4 hover:from-green-700/85 hover:via-emerald-600/75 hover:to-green-800/85 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/20 before:via-transparent before:to-emerald-400/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        "eco-mint": "bg-gradient-to-br from-green-100/50 via-mint-200/40 to-emerald-100/50 backdrop-blur-xl border border-green-200/50 shadow-xl hover:shadow-2xl hover:shadow-green-500/25 hover:scale-110 hover:-translate-y-4 hover:from-green-200/60 hover:via-mint-300/50 hover:to-emerald-200/60 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        "eco-ripple": "bg-gradient-to-br from-green-400/15 to-emerald-500/15 backdrop-blur-2xl border border-green-400/30 shadow-xl hover:shadow-2xl hover:shadow-green-500/40 hover:scale-110 hover:-translate-y-4 hover:from-green-500/20 hover:to-emerald-600/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-green-400/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
        
        "eco-crystal": "bg-gradient-to-br from-white/40 via-green-50/30 to-emerald-100/40 backdrop-blur-2xl border-2 border-white/50 shadow-2xl hover:shadow-green-500/30 hover:scale-110 hover:-translate-y-4 before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_25%,rgba(34,197,94,0.1)_25%,rgba(34,197,94,0.1)_50%,transparent_50%,transparent_75%,rgba(34,197,94,0.1)_75%)] before:bg-[length:20px_20px] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        "eco-gradient-glass": "bg-gradient-to-br from-green-400/20 via-emerald-500/15 to-green-600/20 backdrop-blur-2xl border border-green-400/40 shadow-2xl hover:shadow-green-500/50 hover:scale-110 hover:-translate-y-4 hover:from-green-500/25 hover:via-emerald-600/20 hover:to-green-700/25 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-green-400/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean
  glow?: boolean
  greenTint?: "light" | "medium" | "dark"
  transparency?: number
  ecoTexture?: boolean
  recycledEffect?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    hover = false, 
    glow = false, 
    greenTint,
    transparency,
    ecoTexture = false,
    recycledEffect = false,
    children,
    ...props 
  }, ref) => {
    // Generate green tint classes
    const greenTintClasses = greenTint ? {
      light: "before:bg-green-200/20 hover:before:bg-green-300/30",
      medium: "before:bg-green-400/30 hover:before:bg-green-500/40", 
      dark: "before:bg-green-600/40 hover:before:bg-green-700/50"
    }[greenTint] : ""
    
    // Generate transparency styles
    const transparencyStyle = transparency ? {
      backgroundColor: `rgba(255, 255, 255, ${transparency / 100})`,
      backdropFilter: 'blur(12px)'
    } : {}
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          hover && "hover:scale-[1.02] hover:-translate-y-1",
          glow && "hover:shadow-green-500/40",
          greenTint && "relative before:absolute before:inset-0 before:rounded-inherit before:transition-all before:duration-300",
          greenTint && greenTintClasses,
          ecoTexture && "before:bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.05),transparent_50%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.03),transparent_50%)]",
          recycledEffect && "after:absolute after:inset-0 after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"25\" cy=\"25\" r=\"2\" fill=\"%2322c55e\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1.5\" fill=\"%2310b981\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%2315803d\" opacity=\"0.1\"/></svg>')] after:bg-repeat after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:pointer-events-none",
          className
        )}
        style={transparency ? transparencyStyle : props.style}
        {...props}
      >
        {children}
        {recycledEffect && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-600/40 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-0 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
