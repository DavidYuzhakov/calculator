import { ACTIONS } from "./actions"

function evaluate ({ curOperand, prevOperand, operation}) {
  const prev = parseFloat(prevOperand)
  const current = parseFloat(curOperand)
  if (isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "÷":
      computation = prev / current
      break
    case "×":
      computation = prev * current
      break
  }

  return computation.toString().replace('.', ',')
}

export function reducer (state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.curOperand?.length >= 16) return state
      if (payload.digit === ',' && !state.curOperand) return state
      if (payload.digit === '0' && state.curOperand === '0') return state
      if (payload.digit === ',' && state.curOperand?.includes(',')) return state
        
      if (state.overwrite) {
        return {
          ...state,
          curOperand: payload.digit,
          overwrite: false
        }
      }

      return {
        ...state,
        curOperand: `${state.curOperand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION: 
      if (payload.operation === '-' && state.curOperand == null) {
        return {
          ...state,
          prevOperand: '0',
          operation: payload.operation
        }
      }
      if (state.curOperand == null && state.prevOperand == null) return state

      if  (state.curOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.prevOperand == null) {
        return {
          ...state,
          prevOperand: state.curOperand,
          operation: payload.operation,
          curOperand: null
        }
      }

      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        curOperand: null
      }
    case ACTIONS.CLEAR: 
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) return {...state, overwrite: false, curOperand: null}
      if (!state.curOperand) return state
      if (state.curOperand.lenght === 1) return {...state, curOperand: null}

      return {
        ...state,
        curOperand: state.curOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (!state.operation || !state.curOperand || state.prevOperand == null) return state

      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation: null,
        curOperand: evaluate(state)
      }
  }
}