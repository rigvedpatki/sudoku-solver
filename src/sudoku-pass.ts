import { Position } from './sudoku-interfaces'
import {
  getUniqueValuesInRow,
  getUniqueValuesInColumn,
  getUniqueValuesInSquare,
  displaySudokuMatrix,
  timer
} from './sudoku-utils'

export const pass = async (
  sudokuMatrix: Array<Array<number>>,
  previousPassSudoku: Array<Array<number>>,
  passes: number,
  steps: number,
  loop: number,
  zeroPositions: Array<Position>
) => {
  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  passes = passes + 1
  console.log(
    `================================================== Pass ${passes} ==================================================`
  )

  if (previousPassSudoku === sudokuMatrix && passes > 10) {
    console.log('Someting is wrong')
    process.exit()
  }

  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      if (sudokuMatrix[rowIndex][columnIndex] === 0) {
        const uniqueValuesInRow = getUniqueValuesInRow(sudokuMatrix, rowIndex)
        const uniqueValuesInCol = getUniqueValuesInColumn(
          sudokuMatrix,
          columnIndex
        )
        const uniqueValuesInSquare = getUniqueValuesInSquare(
          sudokuMatrix,
          rowIndex,
          columnIndex
        )
        const allUniqueValues = [
          ...new Set([
            ...uniqueValuesInRow,
            ...uniqueValuesInCol,
            ...uniqueValuesInSquare
          ])
        ]
        const allPossibleValues = temp.filter(
          el => !allUniqueValues.includes(el)
        )
        // console.log('uniqueValuesInRow', uniqueValuesInRow);
        // console.log('uniqueValuesInCol', uniqueValuesInCol);
        // console.log('uniqueValuesInSquare', uniqueValuesInSquare);
        // console.log('allUniqueValues', allUniqueValues);
        // console.log('allPossibleValues', allPossibleValues);
        if (allPossibleValues.length === 1) {
          steps = steps + 1
          console.log(
            `Position(${rowIndex},${columnIndex}) = ${allPossibleValues[0]}`
          )
          sudokuMatrix[rowIndex][columnIndex] = allPossibleValues[0]
          displaySudokuMatrix(sudokuMatrix, zeroPositions, {
            row: rowIndex,
            column: columnIndex
          })
          console.log(`Step number ${steps}`)
          await timer(3000)
        }
      }
      loop = loop + 1
    }
    loop = loop + 1
  }

  let singleArray = sudokuMatrix.reduce((accArray, row) => {
    row.forEach(el => {
      accArray.push(el)
    })
    return accArray
  }, [])
  const unique = [...new Set(singleArray)]
  // console.log('single array', singleArray)
  // console.log('unique', unique)
  if (unique.includes(0)) {
    previousPassSudoku = sudokuMatrix
    console.log(`Loops: ${loop}`)
    pass(sudokuMatrix, previousPassSudoku, passes, steps, loop, zeroPositions)
  }
}
