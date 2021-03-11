import { red, green, yellow } from 'chalk'
import { Position } from './sudoku-interfaces'

export const getAllBlankPositions = (
  matrix: Array<Array<number>>
): Array<Position> => {
  const allPositions: Array<Position> = []
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[rowIndex].length;
      columnIndex++
    ) {
      if (matrix[rowIndex][columnIndex] === 0) {
        allPositions.push({
          row: rowIndex,
          column: columnIndex
        })
      }
    }
  }
  return allPositions
}

export const getUniqueValuesInRow = (
  matrix: Array<Array<number>>,
  rowIndex: number
): Array<number> => {
  return matrix[rowIndex].filter(el => el !== 0)
}

export const getUniqueValuesInColumn = (
  matrix: Array<Array<number>>,
  columnIndex: number
): Array<number> => {
  return matrix.map(row => row[columnIndex]).filter(el => el !== 0)
}

export const getUniqueValuesInSquare = (
  matrix: Array<Array<number>>,
  rowIndex: number,
  columnIndex: number
): Array<number> => {
  let startRow: number
  let endRow: number
  let startColumn: number
  let endColumn: number
  if (rowIndex >= 0 && rowIndex <= 2 && columnIndex >= 0 && columnIndex <= 2) {
    // console.log('Square 1')
    startRow = 0
    endRow = 2
    startColumn = 0
    endColumn = 2
  } else if (
    rowIndex >= 3 &&
    rowIndex <= 5 &&
    columnIndex >= 0 &&
    columnIndex <= 2
  ) {
    // console.log('Square 4')
    startRow = 3
    endRow = 5
    startColumn = 0
    endColumn = 2
  } else if (
    rowIndex >= 6 &&
    rowIndex <= 8 &&
    columnIndex >= 0 &&
    columnIndex <= 2
  ) {
    // console.log('Square 7')
    startRow = 6
    endRow = 8
    startColumn = 0
    endColumn = 2
  } else if (
    rowIndex >= 0 &&
    rowIndex <= 2 &&
    columnIndex >= 3 &&
    columnIndex <= 5
  ) {
    // console.log('Square 2')
    startRow = 0
    endRow = 2
    startColumn = 3
    endColumn = 5
  } else if (
    rowIndex >= 3 &&
    rowIndex <= 5 &&
    columnIndex >= 3 &&
    columnIndex <= 5
  ) {
    // console.log('Square 5')
    startRow = 3
    endRow = 5
    startColumn = 3
    endColumn = 5
  } else if (
    rowIndex >= 6 &&
    rowIndex <= 8 &&
    columnIndex >= 3 &&
    columnIndex <= 5
  ) {
    // console.log('Square 8')
    startRow = 6
    endRow = 8
    startColumn = 3
    endColumn = 5
  } else if (
    rowIndex >= 0 &&
    rowIndex <= 2 &&
    columnIndex >= 6 &&
    columnIndex <= 8
  ) {
    // console.log('Square 3')
    startRow = 0
    endRow = 2
    startColumn = 6
    endColumn = 8
  } else if (
    rowIndex >= 3 &&
    rowIndex <= 5 &&
    columnIndex >= 6 &&
    columnIndex <= 8
  ) {
    // console.log('Square 6')
    startRow = 3
    endRow = 5
    startColumn = 6
    endColumn = 8
  } else if (
    rowIndex >= 6 &&
    rowIndex <= 8 &&
    columnIndex >= 6 &&
    columnIndex <= 8
  ) {
    // console.log('Square 9')
    startRow = 6
    endRow = 8
    startColumn = 6
    endColumn = 8
  } else {
    console.log('Wrong Square')
    return []
  }

  return matrix
    .slice(startRow, endRow + 1)
    .map(el => el.slice(startColumn, endColumn + 1))
    .reduce((initialArray, row) => {
      initialArray = [...initialArray, ...row]
      return initialArray
    }, [])
    .filter(el => el !== 0)
}

export const displaySudokuMatrix = (
  matrix: Array<Array<number>>,
  zeroPositions: Array<Position>,
  position?: Position
) => {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    let el = ''
    if (rowIndex === 0) {
      process.stdout.write(`\n${'-'.repeat(37)}\n`)
    }
    for (
      let columnIndex = 0;
      columnIndex < matrix[rowIndex].length;
      columnIndex++
    ) {
      el = `| ${matrix[rowIndex][columnIndex]} `
      let zeroPosition = zeroPositions.find(
        position => position.row === rowIndex && position.column === columnIndex
      )
      if (zeroPosition) {
        if (matrix[rowIndex][columnIndex] === 0) {
          if (position) {
            if (position.row === rowIndex && position.column === columnIndex) {
              process.stdout.write(`| ${red(matrix[rowIndex][columnIndex])} `)
            } else {
              process.stdout.write(`| ${green(matrix[rowIndex][columnIndex])} `)
            }
          } else {
            process.stdout.write(`| ${green(matrix[rowIndex][columnIndex])} `)
          }
        } else {
          if (position) {
            if (position.row === rowIndex && position.column === columnIndex) {
              process.stdout.write(`| ${red(matrix[rowIndex][columnIndex])} `)
            } else {
              process.stdout.write(
                `| ${yellow(matrix[rowIndex][columnIndex])} `
              )
            }
          } else {
            process.stdout.write(`| ${yellow(matrix[rowIndex][columnIndex])} `)
          }
        }
      } else {
        process.stdout.write(`| ${matrix[rowIndex][columnIndex]} `)
      }
      if (columnIndex === matrix[rowIndex].length - 1) {
        process.stdout.write('|')
      }
    }
    process.stdout.write(
      `\n${'-'.repeat(matrix[rowIndex].length * el.length + 1)}\n`
    )
  }
}

export const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
