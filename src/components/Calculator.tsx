import type { ReactNode } from 'react'
import { useCalculator } from '../hooks/useCalculator'
import { CalculatorDisplay } from './CalculatorDisplay'
import { CalculatorKeypad } from './CalculatorKeypad'

export function Calculator(): ReactNode {
  const { state, dispatch } = useCalculator()

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6">
      <main
        className="bg-[var(--cal-bg)] box-border flex h-[468px] w-[304px] flex-col gap-[12px] items-start overflow-hidden p-5 rounded-[20px] shadow-[-7px_18px_20px_-8px_rgba(0,0,0,0.25)]"
        data-node-id="4:3"
        data-name="main"
      >
        <CalculatorDisplay value={state.currentValue} />
        <CalculatorKeypad
          onAction={dispatch}
          pendingOperator={state.pendingOperator}
        />
      </main>
    </div>
  )
}
