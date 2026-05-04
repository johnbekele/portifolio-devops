import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function FormSection({ children }: { children: ReactNode }) {
  return <div className="space-y-5">{children}</div>
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2 pt-4 border-t border-border">{children}</div>
}
