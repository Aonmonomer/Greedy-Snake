const playButton = document.getElementById('playBtn')

playButton.addEventListener('click', () => {
  console.log('Clicked already!')
  window.location.href = 'https://marvelous-stage.surge.sh/game'
})
