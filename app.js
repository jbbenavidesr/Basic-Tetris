document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid__square'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10

    // The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const zTetramino = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
    ] 
    const tTetramino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]
    const oTetramino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]
    const iTetramino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetraminoes = [lTetromino, zTetramino, tTetramino, oTetramino, iTetramino]

    let currentPosition = 4
    let currentRotation = 0

    // Randomly select a Tetramino and its first rotation
    let random = Math.floor(Math.random()*theTetraminoes.length)
    let current = theTetraminoes[random][currentRotation]

    //draw the Tetramino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetramino')
        })
    }

    // undraw the Tetramino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetramino')
        })
    }

    // make the tetramino move down every second
    timerId = setInterval(moveDown, 750)

    // assign functions to keyCodes
    function control(e) {
        if(e.keyCode ===37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotateTetramino()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    //moveDown function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze 
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('grid__taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('grid__taken'))
            //start a new tetromino falling
            random = Math.floor(Math.random() * theTetraminoes.length)
            current = theTetraminoes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }

    // move the tetromino left unless it's at the edge or there is a blockage
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1

        if(current.some(index => squares[currentPosition + index].classList.contains('grid__taken'))){
            currentPosition += 1
        }

        draw()
    }

    // move the tetromino right unless it's at the edge or there is a blockage
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index ) % width === width - 1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('grid__taken'))){
            currentPosition -= 1
        }

        draw()
    }

    // rotate the tetramino
    function rotateTetramino() {
        undraw()
        currentRotation ++
        if (currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetraminoes[random][currentRotation]

        draw()
    }


})