const snakeBody = [{ x: 10, y: 11 }]
const snakeBoard = document.getElementById('snakeBoard')

const updateSnake = () => {
  console.log('Update snake')
}

const drawSnake = (snakeBoard) => {
  snakeBody.forEach((bodyPiece) => {
    const snakePiece = document.createElement('div')
    snakePiece.style.gridRowStart = bodyPiece.x
    snakePiece.style.gridColumnStart = bodyPiece.y
    snakePiece.classList.add('snake')
    snakeBoard.appendChild(snakePiece)
  })
}

drawSnake(snakeBoard)
