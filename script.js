let map = ['', '', '', '', '', '', '', '', '']
const turn = document.querySelector('.turn')
let xORo = 'x'
let counter = 0
let validator = true
const tapEffect = new Audio('sound Effects/click.mp3')

function audioToPlay(audio) {
	audio
		.play()
		.then(() => {
			document.querySelector('.dialog-backdrop').style.display = 'none'
		})
		.catch(() => {
			const dialog = document.querySelector('.dialog')
			dialog.style.display = 'flex'

			document.querySelector('.playBtn').addEventListener('click', () => {
				tapEffect.play()
				audio.play()

				dialog.style.display = 'none'
				document.querySelector('.dialog-backdrop').style.display = 'none'
			})
		})
}

function checkConditions() {
	if (map[0] != '' && map[0] == map[4] && map[4] == map[8]) {
		finishMatch(0, 4, 8, map[0], 'Won')
		return 0
	} else if (map[2] != '' && map[2] == map[4] && map[4] == map[6]) {
		finishMatch(2, 4, 6, map[2], 'Won')
		return 0
	}

	//columns
	for (let i = 0; i < 3; i++) {
		if (map[i] != '' && map[i] == map[i + 3] && map[i + 3] == map[i + 6]) {
			finishMatch(i, i + 3, i + 6, map[i], 'Won')
			return 0
		}
	}

	//row
	for (let i = 0; i < 7; i += 3) {
		if (map[i] != '' && map[i] == map[i + 1] && map[i + 1] == map[i + 2]) {
			finishMatch(i, i + 1, i + 2, map[i], 'Won')
			return 0
		}
	}

	counter++
	if (counter >= 9) {
		finishMatch(-1, -1, -1, 'none', 'Draw')
		return 0
	}
}

function finishMatch(index1, index2, index3, player, status) {
	validator = false
	document.querySelectorAll('.cell').forEach((el, i) => {
		if (i == index1 || i == index2 || i == index3) {
			el.style.color = 'hsl(2, 89%, 34%)'
		}
	})

	turn.innerText = `${player.toUpperCase()} ${status}`

	if (player == 'none') {
		document.querySelectorAll('.cell').forEach((el, i) => {
			el.style.color = 'hsl(2, 89%, 34%)'
		})
		turn.innerText = `Tie`
	}

	const gameOver = new Audio('sound Effects/game-over.mp3')
	gameOver.play()

	const ResetGameBtn = document.querySelector('.reset-game-btn')
	ResetGameBtn.style.display = 'block'

	ResetGameBtn.addEventListener('click', () => {
		map = ['', '', '', '', '', '', '', '', '']
		document.querySelector('.board').innerHTML = `
				<div class="cell" data-value="t" data-index="0"></div>
				<div class="cell" data-value="t" data-index="1"></div>
				<div class="cell" data-value="t" data-index="2"></div>
				<div class="cell" data-value="t" data-index="3"></div>
				<div class="cell" data-value="t" data-index="4"></div>
				<div class="cell" data-value="t" data-index="5"></div>
				<div class="cell" data-value="t" data-index="6"></div>
				<div class="cell" data-value="t" data-index="7"></div>
				<div class="cell" data-value="t" data-index="8"></div>
		`
		validator = true
		turn.innerText = "X's Turn"
		xORo = 'x'
		ResetGameBtn.style.display = 'none'
		counter = 0
	})
}

const backgroundMusic = new Audio('sound Effects/Background-music.mp3')
audioToPlay(backgroundMusic)

backgroundMusic.volume = 0.16
backgroundMusic.addEventListener('ended', function () {
	backgroundMusic.currentTime = 0 // Reset the audio to the beginning
	audioToPlay(backgroundMusic)
})

const board = document.querySelector('.board')
board.onclick = function (event) {
	const target = event.target

	if (target.className != 'cell' || target.dataset.value == 'f' || !validator)
		return 0

	audioToPlay(tapEffect)

	if (xORo == 'x') {
		target.innerText = 'X'
		xORo = 'o'
		turn.innerText = "O's Turn"
		target.dataset.value = 'f'

		map[Number(target.dataset.index)] = 'x'
	} else {
		target.innerText = 'O'
		xORo = 'x'
		turn.innerText = "X's Turn"
		target.dataset.value = 'f'

		map[Number(target.dataset.index)] = 'O'
	}

	checkConditions()
}


