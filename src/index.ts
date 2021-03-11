import { red, green } from 'chalk'

let sudokuMainMatrix: Array<Array<number>> = [
  [0, 0, 5, 8, 7, 6, 3, 0, 0],
  [4, 0, 0, 0, 3, 0, 5, 0, 0],
  [0, 8, 3, 5, 4, 0, 1, 0, 0],
  [0, 0, 2, 0, 0, 4, 0, 0, 5],
  [0, 9, 8, 6, 2, 1, 7, 3, 4],
  [0, 0, 4, 3, 0, 0, 2, 0, 0],
  [0, 0, 6, 9, 1, 8, 4, 0, 3],
  [0, 0, 9, 2, 6, 7, 8, 5, 1],
  [0, 0, 0, 4, 5, 0, 0, 2, 6]
]

let zeroPositions: Array<Position> = []

async function main() {
  console.log('initial sudoku')
  zeroPositions = getAllBlankPositions(sudokuMainMatrix)
  displaySudokuMatrix(sudokuMainMatrix)
  // console.table(sudokuMainMatrix)

  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let passes = 0
  let steps = 0
  let loop = 0
  let previousPassSudoku: Array<Array<number>> = sudokuMainMatrix
  function pass(sudokuMatrix: Array<Array<number>>) {
    passes = passes + 1
    console.log(
      `================================================== Pass ${passes} ==================================================`
    )

    if (previousPassSudoku === sudokuMainMatrix && passes > 10) {
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
            displaySudokuMatrix(sudokuMainMatrix, {
              row: rowIndex,
              column: columnIndex
            })
            console.log(`Step number ${steps}`)
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
      previousPassSudoku = sudokuMainMatrix
      console.log(`Loops: ${loop}`)
      pass(sudokuMatrix)
    }
  }

  pass(sudokuMainMatrix)
}

console.log('Execution started')
main().then(() => {
  console.log('Execution finished')
})

function getUniqueValuesInRow(
  matrix: Array<Array<number>>,
  rowIndex: number
): Array<number> {
  return matrix[rowIndex].filter(el => el !== 0)
}

function getUniqueValuesInColumn(
  matrix: Array<Array<number>>,
  columnIndex: number
): Array<number> {
  return matrix.map(row => row[columnIndex]).filter(el => el !== 0)
}

function getUniqueValuesInSquare(
  matrix: Array<Array<number>>,
  rowIndex: number,
  columnIndex: number
): Array<number> {
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

function displaySudokuMatrix(
  matrix: Array<Array<number>>,
  position?: Position
) {
  // let rowText = ''
  // matrix.forEach(row => {
  //   rowText = `| ${row.join(' | ')} |`
  //   console.log('-'.repeat(rowText.length))
  //   console.log(rowText)
  // })
  // console.log('-'.repeat(rowText.length))
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

interface Position {
  row: number
  column: number
}

function getAllBlankPositions(matrix: Array<Array<number>>): Array<Position> {
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
