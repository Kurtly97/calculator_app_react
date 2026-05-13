import { twMerge } from 'tailwind-merge'
import type { ReactNode } from 'react'

export type CalcButtonVariant = 'beige' | 'orange'

export type CalcButtonProps = {
  ariaLabel: string
  children: ReactNode
  className?: string
  onClick: () => void
  pressed?: boolean
  variant: CalcButtonVariant
}

export function CalcButton({
  ariaLabel,
  children,
  className,
  onClick,
  pressed = false,
  variant,
}: CalcButtonProps): ReactNode {
  return (
    <button
      type="button"
      className={twMerge(
        'calc-button flex items-center justify-center',
        'p-[var(--narrow)] rounded-[var(--corners)] text-[24px]',
        variant === 'beige'
          ? 'bg-[var(--beige-def)] text-[color:var(--beige-text)]'
          : 'bg-[var(--orange-def)] text-[color:var(--orange-text)]',
        'size-[60px]',
        className,
      )}
      data-variant={variant}
      aria-label={ariaLabel}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
