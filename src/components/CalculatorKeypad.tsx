import type { ReactNode } from 'react'
import type { CalculatorAction, Operator } from '../lib/calculator'
import { CalcButton } from './CalcButton'

type KeypadButtonConfig = {
  action: CalculatorAction
  ariaLabel: string
  className?: string
  label: string
  operatorValue?: Operator
  variant: 'beige' | 'orange'
}

const keypadButtons: KeypadButtonConfig[] = [
  {
    label: 'AC',
    action: { type: 'clear' },
    variant: 'beige',
    ariaLabel: 'All clear',
  },
  {
    label: '+/-',
    action: { type: 'toggle-sign' },
    variant: 'beige',
    ariaLabel: 'Toggle positive or negative',
  },
  {
    label: '%',
    action: { type: 'percent' },
    variant: 'beige',
    ariaLabel: 'Percent',
  },
  {
    label: '/',
    action: { type: 'operator', value: '/' },
    variant: 'orange',
    ariaLabel: 'Divide',
    operatorValue: '/',
  },
  {
    label: '7',
    action: { type: 'digit', value: '7' },
    variant: 'beige',
    ariaLabel: '7',
  },
  {
    label: '8',
    action: { type: 'digit', value: '8' },
    variant: 'beige',
    ariaLabel: '8',
  },
  {
    label: '9',
    action: { type: 'digit', value: '9' },
    variant: 'beige',
    ariaLabel: '9',
  },
  {
    label: 'X',
    action: { type: 'operator', value: '*' },
    variant: 'orange',
    ariaLabel: 'Multiply',
    operatorValue: '*',
  },
  {
    label: '4',
    action: { type: 'digit', value: '4' },
    variant: 'beige',
    ariaLabel: '4',
  },
  {
    label: '5',
    action: { type: 'digit', value: '5' },
    variant: 'beige',
    ariaLabel: '5',
  },
  {
    label: '6',
    action: { type: 'digit', value: '6' },
    variant: 'beige',
    ariaLabel: '6',
  },
  {
    label: '-',
    action: { type: 'operator', value: '-' },
    variant: 'orange',
    ariaLabel: 'Subtract',
    operatorValue: '-',
  },
  {
    label: '1',
    action: { type: 'digit', value: '1' },
    variant: 'beige',
    ariaLabel: '1',
  },
  {
    label: '2',
    action: { type: 'digit', value: '2' },
    variant: 'beige',
    ariaLabel: '2',
  },
  {
    label: '3',
    action: { type: 'digit', value: '3' },
    variant: 'beige',
    ariaLabel: '3',
  },
  {
    label: '+',
    action: { type: 'operator', value: '+' },
    variant: 'orange',
    ariaLabel: 'Add',
    operatorValue: '+',
  },
  {
    label: '0',
    action: { type: 'digit', value: '0' },
    variant: 'beige',
    ariaLabel: '0',
    className: 'col-span-2 h-[60px] w-auto',
  },
  {
    label: '.',
    action: { type: 'decimal' },
    variant: 'beige',
    ariaLabel: 'Decimal point',
  },
  {
    label: '=',
    action: { type: 'equals' },
    variant: 'orange',
    ariaLabel: 'Equals',
  },
]

export type CalculatorKeypadProps = {
  onAction: (action: CalculatorAction) => void
  pendingOperator: Operator | null
}

export function CalculatorKeypad({
  onAction,
  pendingOperator,
}: CalculatorKeypadProps): ReactNode {
  return (
    <div
      id="numpad"
      className="grid shrink-0 grid-cols-4 gap-[var(--default)] p-[var(--none)]"
      data-node-id="4:125"
      data-name="numpad"
    >
      {keypadButtons.map((button) => (
        <CalcButton
          key={button.ariaLabel}
          ariaLabel={button.ariaLabel}
          className={button.className}
          onClick={() => {
            onAction(button.action)
          }}
          pressed={button.operatorValue === pendingOperator}
          variant={button.variant}
        >
          {button.label}
        </CalcButton>
      ))}
    </div>
  )
}
