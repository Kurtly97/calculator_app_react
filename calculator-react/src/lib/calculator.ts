export type Operator = '+' | '-' | '*' | '/'

export type CalculatorAction =
  | { type: 'clear' }
  | { type: 'toggle-sign' }
  | { type: 'percent' }
  | { type: 'digit'; value: string }
  | { type: 'decimal' }
  | { type: 'operator'; value: Operator }
  | { type: 'equals' }

export type CalculatorState = {
  currentValue: string
  storedValue: number | null
  pendingOperator: Operator | null
  shouldReplaceDisplay: boolean
}

export const initialCalculatorState: CalculatorState = {
  currentValue: '0',
  storedValue: null,
  pendingOperator: null,
  shouldReplaceDisplay: false,
}

export const formatDisplay = (value: number): string => {
  if (!Number.isFinite(value)) {
    return 'Error'
  }

  return String(value)
}

export const parseDisplay = (currentValue: string): number =>
  Number.parseFloat(currentValue)

export const applyOperator = (
  left: number,
  operator: Operator,
  right: number,
): number => {
  switch (operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      return right === 0 ? Number.NaN : left / right
    default:
      return right
  }
}

export const reduceCalculatorState = (
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState => {
  switch (action.type) {
    case 'clear':
      return initialCalculatorState
    case 'toggle-sign': {
      if (state.currentValue === 'Error' || state.currentValue === '0') {
        return state
      }

      return {
        ...state,
        currentValue: state.currentValue.startsWith('-')
          ? state.currentValue.slice(1)
          : `-${state.currentValue}`,
      }
    }
    case 'percent': {
      if (state.currentValue === 'Error') {
        return state
      }

      return {
        ...state,
        currentValue: formatDisplay(parseDisplay(state.currentValue) / 100),
        shouldReplaceDisplay: true,
      }
    }
    case 'digit': {
      if (state.shouldReplaceDisplay || state.currentValue === 'Error') {
        return {
          ...state,
          currentValue: action.value,
          shouldReplaceDisplay: false,
        }
      }

      return {
        ...state,
        currentValue:
          state.currentValue === '0'
            ? action.value
            : `${state.currentValue}${action.value}`,
      }
    }
    case 'decimal': {
      if (state.shouldReplaceDisplay || state.currentValue === 'Error') {
        return {
          ...state,
          currentValue: '0.',
          shouldReplaceDisplay: false,
        }
      }

      if (state.currentValue.includes('.')) {
        return state
      }

      return {
        ...state,
        currentValue: `${state.currentValue}.`,
      }
    }
    case 'operator': {
      if (state.currentValue === 'Error') {
        return state
      }

      const nextValue = parseDisplay(state.currentValue)

      if (
        state.pendingOperator !== null &&
        state.storedValue !== null &&
        !state.shouldReplaceDisplay
      ) {
        const result = applyOperator(
          state.storedValue,
          state.pendingOperator,
          nextValue,
        )

        return {
          currentValue: formatDisplay(result),
          storedValue: Number.isFinite(result) ? result : null,
          pendingOperator: action.value,
          shouldReplaceDisplay: true,
        }
      }

      return {
        ...state,
        storedValue: nextValue,
        pendingOperator: action.value,
        shouldReplaceDisplay: true,
      }
    }
    case 'equals': {
      if (
        state.pendingOperator === null ||
        state.storedValue === null ||
        state.currentValue === 'Error'
      ) {
        return state
      }

      const result = applyOperator(
        state.storedValue,
        state.pendingOperator,
        parseDisplay(state.currentValue),
      )

      return {
        currentValue: formatDisplay(result),
        storedValue: null,
        pendingOperator: null,
        shouldReplaceDisplay: true,
      }
    }
    default:
      return state
  }
}

export const mapKeyboardToAction = (key: string): CalculatorAction | null => {
  if (key === 'Escape') {
    return { type: 'clear' }
  }

  if (/^\d$/.test(key)) {
    return { type: 'digit', value: key }
  }

  if (key === '.') {
    return { type: 'decimal' }
  }

  if (key === '+' || key === '-' || key === '/' || key === '*') {
    return { type: 'operator', value: key }
  }

  if (key === '%') {
    return { type: 'percent' }
  }

  if (key === 'Enter' || key === '=') {
    return { type: 'equals' }
  }

  return null
}
