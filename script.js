const Player = (username) => {
  const markers = ['X', 'O']
  const marker = markers[Math.floor(Math.random() * 2)]
  return { username, marker }
}

const boxes = document.querySelectorAll('.box')

const player1Inp = document.getElementById('player1Name')
const player2Inp = document.getElementById('player2Name')

const questionaire = document.getElementById('questionaire')

const continueGame = document.getElementById('continue-game')

const newGame = document.querySelector('#new-game')

let player1
let player2

let marker

continueGame.addEventListener('click', () => {
  player1 = player1Inp.value ? Player(player1Inp.value) : Player('Player 1')
  player2 = player2Inp.value ? Player(player2Inp.value) : Player('Player 2')
  if (player1.marker == player2.marker) {
    player2.marker = player1.marker == 'X' ? 'O' : 'X'
  }

  questionaire.style.display = 'none'
  marker = ['X', 'O'][Math.floor(Math.random() * 2)]
  document.getElementById('player-turn').textContent =
    player1.marker == marker ? player1.username : player2.username
  document.querySelector('main').style.display = 'block'
  document.getElementById('player1-username').textContent = player1.username
  document.getElementById('player2-username').textContent = player2.username
  document.getElementById('player1-marker').textContent = player1.marker
  document.getElementById('player2-marker').textContent = player2.marker
})

const Game = {
  gameBoxes: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  boxreseter: () => {
    boxes.forEach((box) => (box.textContent = ''))
    Game.gameBoxes = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  },
  checkWin: (playerMarker) => {
    for (const row of Game.gameBoxes) {
      if (row.every((box) => box === playerMarker)) {
        return true
      }
    }

    for (let col = 0; col < 3; col++) {
      if (
        Game.gameBoxes[0][col] === playerMarker &&
        Game.gameBoxes[1][col] === playerMarker &&
        Game.gameBoxes[2][col] === playerMarker
      ) {
        return true
      }
    }

    if (
      (Game.gameBoxes[0][0] === playerMarker &&
        Game.gameBoxes[1][1] === playerMarker &&
        Game.gameBoxes[2][2] === playerMarker) ||
      (Game.gameBoxes[0][2] === playerMarker &&
        Game.gameBoxes[1][1] === playerMarker &&
        Game.gameBoxes[2][0] === playerMarker)
    ) {
      return true
    }

    return false
  },
  isDraw: () => {
    for (const row of Game.gameBoxes) {
      if (row.includes('')) {
        return false
      }
    }
    return true
  },
}

function boxClickHandler() {
  const box = this
  if (box.textContent == '') {
    box.textContent = marker
    Game.gameBoxes[Number(box.getAttribute('row'))][
      Number(box.getAttribute('column'))
    ] = marker
    if (Game.checkWin(marker)) {
      document.querySelector('h2').style.display = 'none'
      document.querySelector('#winner').style.display = 'block'
      document.querySelector('#winner').textContent = `${
        player1.marker == marker ? player1.username : player2.username
      } is the winner`
      newGame.style.display = 'block'
      boxes.forEach((box) => box.removeEventListener('click', boxClickHandler))
    } else if (Game.isDraw()) {
      document.querySelector('h2').style.display = 'none'
      document.querySelector('#winner').style.display = 'block'
      document.querySelector('#winner').textContent = "It's a draw!"
      newGame.style.display = 'block'
      boxes.forEach((box) => box.removeEventListener('click', boxClickHandler))
    } else {
      marker = marker == 'X' ? 'O' : 'X'
      document.getElementById('player-turn').textContent =
        player1.marker == marker ? player1.username : player2.username
    }
  }
}

boxes.forEach((box) => box.addEventListener('click', boxClickHandler))

newGame.addEventListener('click', () => {
  Game.boxreseter()
  document.querySelector('h2').style.display = 'block'
  document.querySelector('#winner').textContent = ``
  newGame.style.display = 'none'

  boxes.forEach((box) => box.addEventListener('click', boxClickHandler))
})
