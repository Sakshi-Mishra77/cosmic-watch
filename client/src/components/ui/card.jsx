import * as React from "react"
import { cn as utilsCn } from "../../lib/utils" 

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={utilsCn("rounded-xl border border-white/10 bg-space-900/80 text-white shadow-sm backdrop-blur-sm hover:border-white/20 hover:shadow-[0_0_28px_-10px_rgba(0,0,0,0.25)] transition-all duration-200", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={utilsCn("flex flex-col space-y-1.5 p-4 sm:p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={utilsCn("font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={utilsCn("px-4 sm:px-6 pb-4 sm:pb-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }