const backButton = document.getElementById('backBtn')

backButton.addEventListener('click', () => {
  window.location.href =
    'file:///Users/sengkitmun/ga_seir/projects/Greedy-Snake/start.html'
})

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
  addTail()
  const controlDirection = getControlDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += controlDirection.x
  snakeBody[0].y += controlDirection.y
}

let update = () => {
  updateSnake()
  updateFood()
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

const growRate = 3
let newTail = 0

const growSnake = (amount) => {
  newTail += amount
}
const samePositions = (position1, position2) => {
  return position1.x === position2.x && position1.y === position2.y
}

const onSnake = (position) => {
  return snakeBody.some((bodyPiece) => {
    return samePositions(bodyPiece, position)
  })
}

const updateFood = () => {
  if (onSnake(food)) {
    growSnake(growRate)
    food = randomFoodPosition()
  }
}

const addTail = () => {
  for (let i = 0; i < newTail; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newTail = 0
}

// Random Food Position

let randomFoodPosition = () => {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomBoardPosition()
  }
  return newFoodPosition
}

const boardSize = 21
const randomBoardPosition = () => {
  return {
    x: Math.floor(Math.random() * boardSize) + 1,
    y: Math.floor(Math.random() * boardSize) + 1
  }
}
