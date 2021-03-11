import { Position } from './sudoku-interfaces'
import { sudokuMainMatrix } from './sudoku-matrix'
import { pass } from './sudoku-pass'
import { getAllBlankPositions, displaySudokuMatrix } from './sudoku-utils'

let zeroPositions: Array<Position> = []

async function main() {
  console.log('initial sudoku')
  zeroPositions = getAllBlankPositions(sudokuMainMatrix)
  displaySudokuMatrix(sudokuMainMatrix, zeroPositions)
  let passes = 0
  let steps = 0
  let loop = 0
  let previousPassSudoku: Array<Array<number>> = sudokuMainMatrix
  pass(sudokuMainMatrix, previousPassSudoku, passes, steps, loop, zeroPositions)
}

console.log('Execution started')

main().then(() => {
  console.log('Execution finished')
})
