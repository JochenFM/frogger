const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76 //read up on this - if 0 = identifies the first div (i.e. zero), that is square in top left corner 
const width = 9 //we know that the width is 9 as the board has 9 divs in a row
let timerId
let outcomeTimerId
let currentTime = 20


function moveFrog(e){ //pass event through function
    squares[currentIndex].classList.remove('frog')

    switch(e.key) { //these are the keys for the events
        case 'ArrowLeft':
            if (currentIndex % width !== 0) currentIndex -= 1 //as long as currentindex is not 0, we get currentindex minus 1, i.e. can move left. 
                                                                //Because on the very left of the grid every number divisble by 9 means we are at the far left div and moving further left will cause breakge.
                                                                //if it does equal 0, if statement is not true, so frog does not move 
            break                                               //well explained around 3h01min
                                                                //if frog is anywhere away from the edge, i.e. at a div which divided by 9 will not equal zero, the equation (if statement) is true, and the function will be executed, i.e. we can move -1 (i.e. to the left)
        case 'ArrowRight':
            if (currentIndex % width < width -1) currentIndex += 1 //if current index is smaller than 8, i.e. one still until the edge which is 9, frog can move 1 to the right
            break
        case 'ArrowUp':
            if (currentIndex - width >= 0) currentIndex -= width //if current index is groesser/gleich 0, then we can move up, das schliesst aber die gesamt erste Reihe der divs aus, da current index -width, also -9. Also fuer alle Ergebnisse, die kleiner also 0 sind, ist das if statement falsch, wird also die Funktion nicht ausgeuebt, and we cannot move.
            break
        case 'ArrowDown':
            if (currentIndex + width < width * width) currentIndex += width//the opposite from moving up
            break
    }

    squares[currentIndex].classList.add('frog')
}


function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime 
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))//call each logLeft (i.e. div with class .log-left) wich are in the const logsleft as defined above and pass it through moveLogLeft function
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
   
}


function checkOutComes() {
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1')://getting all divs under logleft and check for each if it has a class of l1
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2')://we could go though all 9 divs with this, but visually it is enough to do only five(check what is happening in the HTML with these divs and I will notice)
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3')
                logLeft.classList.add('l4')
                break
        case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4')
                logLeft.classList.add('l5')
                break
        case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5')
                logLeft.classList.add('l1')
                break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1')://getting all divs under logleft and check for each if it has a class of l1
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2')://we could go though all 9 divs with this, but visually it is enough to do only five(check what is happening in the HTML with these divs and I will notice)
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
                break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
                break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
                break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1')://getting all divs under logleft and check for each if it has a class of l1
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2')://we could go though all 9 divs with this, but visually it is enough to do only five(check what is happening in the HTML with these divs and I will notice)
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3')
                carLeft.classList.add('c1')
                break
    }
}


function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1')://getting all divs under logleft and check for each if it has a class of l1
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2')://we could go though all 9 divs with this, but visually it is enough to do only five(check what is happening in the HTML with these divs and I will notice)
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function lose() {
    if (
        squares[currentIndex].classList.contains('c1') ||//check whether currentIndex, i.e. the frog, is on c1, l4, or l5 divs
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
        ){
        resultDisplay.textContent = 'You lose!'
        clearInterval(timerId)//passes the timerId which is the setInterval/1s through clearInterval
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog'),
        document.removeEventListener('keyup', moveFrog)
    }
}


function win() {
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You win!'
        clearInterval(timerId)//passes the timerId which is the setInterval/1s through clearInterval
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {//callback function
    if (timerId) {//at the very start of the game, no timerId, so game starts on else
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)//if game stopped, also frog should not move
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutComes, 50)//check for win or lose - see function above - very 50ms
        document.addEventListener('keyup', moveFrog)//moving of frog is only possible when we press start button

    }
})