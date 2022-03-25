const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
let currentIndex = 76 //read up on this - if 0 = identifies the first div (i.e. zero), that is square in top left corner 
const width = 9 //we know that the width is 9 as the board has 9 divs in a row


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
document.addEventListener('keyup', moveFrog)


function autoMoveLogs() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))//call each logLeft (i.e. div with class .log-left) wich are in the const logsleft as defined above and pass it through moveLogLeft function
    logsRight.forEach(logRight => moveLogRight(logRight))
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

setInterval(autoMoveLogs, 1000)