import { useReducer } from "react"

import { ACTIONS } from "./actions";
import { reducer } from "./reducer";

import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";

const formatOperand = (operand) => operand?.replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, " ");

function App() {
  const [{ curOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {}) 
  const style = curOperand?.length > 13 ? {fontSize: '2rem'} : {}

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{ formatOperand(prevOperand) } { operation }</div>
        <div className="current-operand" style={style}>{ formatOperand(curOperand) }</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationBtn operation={'÷'} dispatch={dispatch} />
      <DigitBtn digit={'1'} dispatch={dispatch} />
      <DigitBtn digit={'2'} dispatch={dispatch} />
      <DigitBtn digit={'3'} dispatch={dispatch} />
      <OperationBtn operation={'×'} dispatch={dispatch} />
      <DigitBtn digit={'4'} dispatch={dispatch} />
      <DigitBtn digit={'5'} dispatch={dispatch} />
      <DigitBtn digit={'6'} dispatch={dispatch} />
      {<OperationBtn operation={'+'} dispatch={dispatch} />}
      <DigitBtn digit={'7'} dispatch={dispatch} />
      <DigitBtn digit={'8'} dispatch={dispatch} />
      <DigitBtn digit={'9'} dispatch={dispatch} />
      {<OperationBtn operation={'-'} dispatch={dispatch} />}
      <DigitBtn digit={'0'} dispatch={dispatch} />
      <DigitBtn digit={','} dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  )
}

export default App
