import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs tracking-widest uppercase text-[#4A4540] font-[var(--font-montserrat)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full border-b border-[#8A8078] bg-transparent py-2.5 text-sm text-[#1A1A1A]",
          "placeholder:text-[#C5BEBC] outline-none",
          "focus:border-[#C9A96E] transition-colors duration-200",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
