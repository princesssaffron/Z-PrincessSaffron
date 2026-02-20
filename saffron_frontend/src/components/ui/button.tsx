import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        royal: "", // NEW VARIANT
        section: "",
        white: "",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, asChild = false, children, ...props }, ref) => {

    /* ================= DEFAULT WHITE BUTTON ================= */
    if (variant === "default" && !asChild) {
      return (
        <button
          ref={ref}
          {...props}
          className={cn(
            `
            relative inline-flex items-center justify-center
            rounded-full
            bg-white
            text-[#2E0F3A]
            h-[44px] min-w-[210px] px-10
            font-sans text-[12px] font-semibold
            tracking-[0.22em] uppercase
            border-none outline-none focus:ring-0
            overflow-visible
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            group
            hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            `,
            className
          )}
        >
          <svg
            className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
            viewBox="0 0 302 46"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="300"
              height="44"
              rx="23"
              ry="23"
              fill="none"
              stroke="#2E0F3A"
              strokeWidth="1.2"
              strokeDasharray="760"
              strokeDashoffset="760"
              className="border-run"
            />
          </svg>

          <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-3">
            {children}
          </span>

          {/* Arrow */}
          <span className="absolute right-6 opacity-0 translate-x-2 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100 group-hover:translate-x-0">
            <svg
              width="18"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="2" y1="6" x2="20" y2="6" />
              <polyline points="14 1 20 6 14 11" />
            </svg>
          </span>

          <style>
            {`
              @keyframes runBorder {
                from { stroke-dashoffset: 760; }
                to { stroke-dashoffset: 0; }
              }
              .group:hover .border-run {
                animation: runBorder 1.1s ease forwards;
              }
              .group:not(:hover) .border-run {
                stroke-dashoffset: 760;
              }
            `}
          </style>
        </button>
      )
    }

    /* ================= SECTION PURPLE BUTTON (WITH ARROW) ================= */
if (variant === "section" && !asChild) {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        `
        relative inline-flex items-center justify-center
        rounded-full
        bg-[#2E0F3A]
        text-[#F5F1E8]
        h-[44px] min-w-[210px] px-10
        font-sans text-[12px] font-semibold
        tracking-[0.22em] uppercase
        border-none outline-none focus:ring-0
        overflow-visible
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        group
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        `,
        className
      )}
    >
      {/* Running Border */}
      <svg
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
        viewBox="0 0 302 46"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="300"
          height="44"
          rx="23"
          ry="23"
          fill="none"
          stroke="#F5F1E8"
          strokeWidth="1.2"
          strokeDasharray="760"
          strokeDashoffset="760"
          className="border-run"
        />
      </svg>

      {/* Text */}
      <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-3">
        {children}
      </span>

      {/* Arrow (SAME AS DEFAULT) */}
      <span className="absolute right-6 opacity-0 translate-x-2 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100 group-hover:translate-x-0">
        <svg
          width="18"
          height="12"
          viewBox="0 0 24 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="2" y1="6" x2="20" y2="6" />
          <polyline points="14 1 20 6 14 11" />
        </svg>
      </span>

      <style>
        {`
          @keyframes runBorder {
            from { stroke-dashoffset: 760; }
            to { stroke-dashoffset: 0; }
          }
          .group:hover .border-run {
            animation: runBorder 1.1s ease forwards;
          }
          .group:not(:hover) .border-run {
            stroke-dashoffset: 760;
          }
        `}
      </style>
    </button>
  )
}

/* ================= WHITE BUTTON (NO ARROW) ================= */
if (variant === "white" && !asChild) {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        `
        relative inline-flex items-center justify-center
        rounded-full
        bg-white
        text-[#2E0F3A]
        h-[44px] min-w-[210px] px-10
        font-sans text-[12px] font-semibold
        tracking-[0.22em] uppercase
        border-none outline-none focus:ring-0
        overflow-visible
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        group
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
        `,
        className
      )}
    >
      {/* Running Border */}
      <svg
        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
        viewBox="0 0 302 46"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="300"
          height="44"
          rx="23"
          ry="23"
          fill="none"
          stroke="#2E0F3A"
          strokeWidth="1.2"
          strokeDasharray="760"
          strokeDashoffset="760"
          className="border-run"
        />
      </svg>

      {/* Text (NO ARROW SHIFT) */}
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>

      <style>
        {`
          @keyframes runBorder {
            from { stroke-dashoffset: 760; }
            to { stroke-dashoffset: 0; }
          }
          .group:hover .border-run {
            animation: runBorder 1.1s ease forwards;
          }
          .group:not(:hover) .border-run {
            stroke-dashoffset: 760;
          }
        `}
      </style>
    </button>
  )
}

    /* ================= ROYAL PURPLE BUTTON ================= */
    if (variant === "royal" && !asChild) {
      return (
        <button
          ref={ref}
          {...props}
          className={cn(
            `
            relative inline-flex items-center justify-center
            rounded-full
            bg-[#2E0F3A]
            text-[#F5F1E8]
            h-[44px] min-w-[210px] px-10
            font-sans text-[12px] font-semibold
            tracking-[0.22em] uppercase
            border-none outline-none focus:ring-0
            overflow-visible
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            group
            hover:shadow-[0_12px_35px_rgba(46,15,58,0.35)]
            `,
            className
          )}
        >
          <svg
            className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
            viewBox="0 0 302 46"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="300"
              height="44"
              rx="23"
              ry="23"
              fill="none"
              stroke="#F5F1E8"
              strokeWidth="1.2"
              strokeDasharray="760"
              strokeDashoffset="760"
              className="border-run"
            />
          </svg>

          {/* No Arrow Here */}
          <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1">
            {children}
          </span>

          <style>
            {`
              @keyframes runBorder {
                from { stroke-dashoffset: 760; }
                to { stroke-dashoffset: 0; }
              }
              .group:hover .border-run {
                animation: runBorder 1.1s ease forwards;
              }
              .group:not(:hover) .border-run {
                stroke-dashoffset: 760;
              }
            `}
          </style>
        </button>
      )
    }

    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
