// Event Listener for buttons

const backButton = document.getElementById('backBtn')

backButton.addEventListener('click', () => {
  location.href = 'index.html'
})

const playAgainButton = document.getElementById('playAgainBtn')
playAgainButton.addEventListener('click', () => {
  location.reload()
})

// Control game Speed, game score and main game refresh rate
let lastRenderTime = 0
let gameOver = false
const snakeSpeed = 10
let gameScore = 0
const displayMessage = document.getElementById('messageBoard')

const gameRate = (currentTime) => {
  if (gameOver === true) {
    displayMessage.style.color = 'red'
    displayMessage.innerText = `You lose, try again!!!`
    return
  }
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
const snakeBody = [{ x: 15, y: 15 }]
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
  checkLosing()
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

let food = { x: 15, y: 10 }

const drawFood = (snakeBoard) => {
  const snakeFood = document.createElement('div')
  snakeFood.style.gridRowStart = food.y
  snakeFood.style.gridColumnStart = food.x
  snakeFood.setAttribute('class', 'food')
  snakeBoard.appendChild(snakeFood)
}

//Snake Eat Food Mechanism

const growRate = 2
let newTail = 0

const growSnake = (amount) => {
  newTail += amount
}
const samePositions = (position1, position2) => {
  if (position1.x === position2.x && position1.y === position2.y) return true
}

const onSnake = (position, { ignoreHead = false } = {}) => {
  return snakeBody.some((bodyPiece, index) => {
    if (ignoreHead === true && index === 0) return false
    return samePositions(bodyPiece, position)
  })
}

const updateFood = () => {
  if (onSnake(food)) {
    gameScore += 10
    document.getElementById('scoreDisplay').innerText = gameScore
    growSnake(growRate)
    food = randomFoodPosition()
  }
}

const addTail = () => {
  for (let i = 0; i < newTail; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length] })
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

const boardSize = 30
const randomBoardPosition = () => {
  return {
    x: Math.floor(Math.random() * boardSize) + 1,
    y: Math.floor(Math.random() * boardSize) + 1
  }
}

// Check Losing Condition

const checkLosing = () => {
  if (hitthewall(snakeBody[0]) || hitSelf()) {
    gameOver = true
  }
}

const hitthewall = (position) => {
  if (
    position.x < 1 ||
    position.x > boardSize ||
    position.y < 1 ||
    position.y > boardSize
  )
    return true
}

const hitSelf = () => {
  return onSnake(snakeBody[0], { ignoreHead: true })
}
