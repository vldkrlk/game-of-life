export function createMatrix(rows, cols) {
  const matrix = new Array(rows);
  for (let row = 0; row < matrix.length; row++) {
    matrix[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = 0;
    }
  }
  return matrix;
}
