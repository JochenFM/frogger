const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
console.log(squares)
let currentIndex = 76 //read up on this - if 0 = identifies the first div (i.e. zero), that is square in top left corner 
const width = 9 //we know that the width is 9 as the board has 9 divs in a row


function moveFrog(e){ //pass event through function

    switch(e.key) { //these are the keys for the events
        case 'ArrowLeft':
            console.log('move left')
            currentIndex -= 1 //currentindex which is 76 - 1
            break
        case 'ArrowRight':
            console.log('move right')
            currentIndex += 1 //currentindex which is 76 + 1
            break
        case 'ArrowUp':
            console.log('move up')
            currentIndex -= width //moving up means take currentindex minus width which is 76-9=67
            break
        case 'ArrowDown':
            console.log('move down')
            currentIndex += width//the opposite from moving up
            break
    }

    squares[currentIndex].classList.add('frog')
}
document.addEventListener('keyup', moveFrog)