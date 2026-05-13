import type { ReactNode } from 'react'

export type CalculatorDisplayProps = {
  value: string
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps): ReactNode {
  return (
    <div
      className="flex h-[84px] w-full min-w-0 shrink-0 items-center justify-end overflow-hidden p-[10px]"
      data-node-id="4:132"
      data-name="Numbers"
    >
      <output
        className="block min-w-0 w-full truncate font-extralight leading-none text-[64px] text-[color:var(--number-color)] text-right"
        htmlFor="numpad"
        aria-live="polite"
        aria-atomic="true"
        title={value}
        data-node-id="4:33"
      >
        {value}
      </output>
    </div>
  )
}
