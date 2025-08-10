import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-110 hover:-translate-y-2 active:scale-95 transform-gpu",
        
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-500/50 hover:scale-110 hover:-translate-y-2 active:scale-95 transform-gpu",
        
        outline: "border-2 border-green-400/60 bg-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-green-500 text-gray-900 rounded-2xl hover:scale-110 hover:-translate-y-2 active:scale-95 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-green-500/30 transform-gpu",
        
        secondary: "bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 hover:bg-white/30 hover:border-white/50 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-2 active:scale-95 transform-gpu",
        
        ghost: "hover:bg-green-500/20 backdrop-blur-xl text-gray-900 rounded-2xl hover:scale-110 hover:-translate-y-2 active:scale-95 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/30 transform-gpu",
        
        link: "text-green-600 underline-offset-4 hover:underline rounded-2xl hover:scale-110 hover:-translate-y-1 active:scale-95 transform-gpu",
        
        // Skipper UI-Inspired Glass Variants
        hero: "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-[length:200%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%] text-white rounded-3xl shadow-2xl hover:shadow-green-500/60 hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 font-bold before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-white/30 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 transform-gpu",
        
        glass: "bg-white/30 border border-white/40 backdrop-blur-2xl text-gray-900 hover:bg-white/40 hover:border-white/60 shadow-2xl hover:shadow-green-500/30 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
        
        "eco-gradient": "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white rounded-3xl shadow-2xl hover:shadow-green-500/60 hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 font-bold relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-white/30 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 transform-gpu",
        
        transparent: "bg-transparent border-2 border-green-400/50 backdrop-blur-xl text-gray-900 hover:bg-green-500/10 hover:border-green-500/80 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
        
        recycled: "bg-gradient-to-br from-green-100/60 to-emerald-200/60 backdrop-blur-xl border border-green-300/60 text-gray-900 hover:from-green-200/70 hover:to-emerald-300/70 hover:border-green-400/80 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/30 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] transform-gpu",
        
        magnetic: "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl hover:shadow-green-500/60 transition-all duration-700 hover:scale-125 hover:-translate-y-4 hover:rotate-1 active:scale-95 active:rotate-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
        
        glow: "bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl shadow-2xl hover:shadow-green-500/80 transition-all duration-700 hover:scale-115 hover:-translate-y-3 active:scale-95 animate-pulse hover:animate-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/40 before:via-transparent before:to-white/40 before:animate-pulse hover:before:animate-none transform-gpu",
        
        neon: "bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-700 hover:scale-115 hover:-translate-y-3 active:scale-95 border-2 border-green-400 hover:border-green-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:-inset-1 after:bg-gradient-to-r after:from-green-400 after:to-emerald-500 after:rounded-3xl after:blur-md after:opacity-0 hover:after:opacity-50 after:transition-opacity after:duration-500 after:-z-10 transform-gpu",
        
        // Additional Eco-Themed Variants
        "eco-leaf": "bg-gradient-to-br from-green-50/80 via-emerald-100/70 to-green-200/60 backdrop-blur-xl border-2 border-green-300/50 text-green-800 hover:from-green-100/90 hover:via-emerald-200/80 hover:to-green-300/70 hover:border-green-400/70 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/30 before:absolute before:inset-0 before:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M20,50 Q50,20 80,50 Q50,80 20,50\" fill=\"%2322c55e\" opacity=\"0.1\"/></svg>')] before:bg-center before:bg-no-repeat before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
        
        "eco-ripple": "bg-gradient-to-r from-green-400/20 to-emerald-500/20 backdrop-blur-2xl border border-green-400/40 text-green-700 hover:from-green-500/30 hover:to-emerald-600/30 hover:border-green-500/60 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/40 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-green-400/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 transform-gpu",
        
        "eco-forest": "bg-gradient-to-br from-green-800/90 via-emerald-700/80 to-green-900/90 text-green-100 hover:from-green-700/95 hover:via-emerald-600/85 hover:to-green-800/95 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-2xl hover:shadow-green-900/60 border border-green-600/50 hover:border-green-500/70 before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/20 before:via-transparent before:to-emerald-400/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
        
        "eco-mint": "bg-gradient-to-r from-green-100/60 via-mint-200/50 to-emerald-100/60 backdrop-blur-xl border border-green-200/60 text-green-800 hover:from-green-200/70 hover:via-mint-300/60 hover:to-emerald-200/70 hover:border-green-300/80 rounded-3xl hover:scale-115 hover:-translate-y-3 active:scale-95 transition-all duration-700 shadow-lg hover:shadow-2xl hover:shadow-green-500/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 transform-gpu",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-10 py-3 text-base font-semibold",
        xl: "h-16 rounded-2xl px-12 py-4 text-lg font-bold",
        icon: "h-11 w-11 rounded-lg",
        "icon-sm": "h-9 w-9 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ripple?: boolean
  shimmer?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  greenTint?: "light" | "medium" | "dark"
  transparency?: number
  ecoGlow?: boolean
  magneticEffect?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    ripple = false,
    shimmer = false,
    loading = false,
    icon,
    iconPosition = "left",
    greenTint,
    transparency,
    ecoGlow = false,
    magneticEffect = false,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
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
    
    const buttonClasses = cn(
      buttonVariants({ variant, size }),
      ripple && "button-ripple",
      shimmer && "shimmer-effect",
      loading && "opacity-70 cursor-not-allowed",
      ecoGlow && "shadow-green-500/60 hover:shadow-green-400/80 animate-pulse hover:animate-none",
      magneticEffect && "hover:scale-125 hover:-translate-y-4 hover:rotate-1 transition-all duration-700",
      greenTint && "relative before:absolute before:inset-0 before:rounded-inherit before:transition-all before:duration-300",
      greenTint && greenTintClasses,
      className
    )
    
    const content = (
      <>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {!loading && children}
        {!loading && icon && iconPosition === "right" && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {shimmer && <div className="absolute inset-0 shimmer-effect" />}
      </>
    )
    
    return (
      <Comp
        className={buttonClasses}
        style={transparency ? transparencyStyle : props.style}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {content}
        {ecoGlow && (
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-green-600/20 animate-pulse" />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
