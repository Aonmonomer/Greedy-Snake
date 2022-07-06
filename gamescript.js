// Control game Speed and refresh game rate
let lastRenderTime = 0
const snakeSpeed = 5

const gameRate = (currentTime) => {
  requestAnimationFrame(gameRate)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime

  update()
  draw()
}
requestAnimationFrame(gameRate)

// Draw the snake
const drawSnake = (snakeBoard) => {
  snakeBody.forEach((bodyPiece) => {
    const snakePiece = document.createElement('div')
    snakePiece.style.gridRowStart = bodyPiece.y
    snakePiece.style.gridColumnStart = bodyPiece.x
    snakePiece.setAttribute('class', 'snake')
    snakeBoard.appendChild(snakePiece)
  })
}

let draw = () => {
  snakeBoard.innerHTML = ''
  drawSnake(snakeBoard)
  drawFood(snakeBoard)
}

// Move the snake & update the snake
const snakeBody = [{ x: 11, y: 11 }]
const snakeBoard = document.getElementById('snakeBoard')

const updateSnake = () => {
  const controlDirection = getControlDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += controlDirection.x
  snakeBody[0].y += controlDirection.y
}

let update = () => {
  updateSnake()
}

// Control direction
let controlDirection = { x: 0, y: 0 }
let lastControlDirection = { x: 0, y: 0 }

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (lastControlDirection.y !== 0) break
      controlDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastControlDirection.y !== 0) break
      controlDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastControlDirection.x !== 0) break
      controlDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastControlDirection.x !== 0) break
      controlDirection = { x: 1, y: 0 }
      break
  }
})

let getControlDirection = () => {
  lastControlDirection = controlDirection
  return controlDirection
}

// Create Food

let food = { x: 10, y: 1 }

const drawFood = (snakeBoard) => {
  const snakeFood = document.createElement('div')
  snakeFood.style.gridRowStart = food.y
  snakeFood.style.gridColumnStart = food.x
  snakeFood.setAttribute('class', 'food')
  snakeBoard.appendChild(snakeFood)
}

//Snake Eat Food Mechanism
