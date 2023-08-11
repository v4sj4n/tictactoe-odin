const Player = (username) => {
  const markers = ["X", "O"]
  const marker = markers[Math.floor(Math.random() * 2)]
  return { username, marker }
}

const player1Inp = document.getElementById("player1Name")
const player2Inp = document.getElementById("player2Name")

const continueGame = document.getElementById("continue-game")

let player1 // Use let to allow reassignment
let player2 // Use let to allow reassignment

continueGame.addEventListener("click", () => {
  player1 = player1Inp.value ? Player(player1Inp.value) : Player("Player 1")
  player2 = player2Inp.value ? Player(player2Inp.value) : Player("Player 2")

  console.log(player1)
  console.log(player2)
})
