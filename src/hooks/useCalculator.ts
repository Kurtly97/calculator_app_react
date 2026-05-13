import { useCallback, useEffect, useState, type Dispatch } from 'react'
import {
  initialCalculatorState,
  mapKeyboardToAction,
  reduceCalculatorState,
  type CalculatorAction,
  type CalculatorState,
} from '../lib/calculator'

export type UseCalculatorResult = {
  state: CalculatorState
  dispatch: Dispatch<CalculatorAction>
}

export const useCalculator = (): UseCalculatorResult => {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState)

  const dispatch = useCallback((action: CalculatorAction) => {
    setState((previousState) => reduceCalculatorState(previousState, action))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const action = mapKeyboardToAction(event.key)

      if (action === null) {
        return
      }

      event.preventDefault()
      dispatch(action)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch])

  return { state, dispatch }
}
