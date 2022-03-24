const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
console.log(squares)
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