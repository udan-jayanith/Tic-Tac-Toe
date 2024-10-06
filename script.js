let map = ['', '', '', '', '', '', '', '', '']

navigator.mediaDevices
	.getUserMedia({audio: true})
	.then(function (stream) {
		console.log('Microphone access granted')
		// You can now use the audio stream
	})
	.catch(function (err) {
		console.log('Microphone access denied', err)
	})


function checkConditions() {
	if (map[0] != '' && map[0] == map[4] && map[4] == map[8]) {
		console.log('/ won')
	} else if (map[2] != '' && map[2] == map[4] && map[4] == map[6]) {
		console.log('| won')
	}

	//columns
	for (let i = 0; i < 3; i++) {
		if (map[i] != '' && map[i] == map[i + 3] && map[i + 3] == map[i + 6]) {
			console.log('for loop condition one')
		}
	}

	//row
	for (let i = 0; i < 7; i += 3) {
		if (map[i] != '' && map[i] == map[i + 1] && map[i + 1] == map[i + 2]) {
			console.log('for loop condition two')
		}
	}
}

let clickCounter = 1
let xORo = 'x'
const turn = document.querySelector('.turn')

const board = document.querySelector('.board')
board.onclick = function (event) {
	const target = event.target

	if (target.className != 'cell' || target.dataset.value == 'f') return 0
	if (clickCounter >= 9) console.log('draw')

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
	clickCounter++
}

//https://in.pinterest.com/pin/pen-and-transprent-png-paint-brush-png-black-transparent-png-transparent-png-image-pngit--790944753322047070/