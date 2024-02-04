(()=>{
    const space = document.querySelectorAll('.space')
    const status = document.querySelector('#status')
    const winnerTxt = document.querySelector('#winner')
    const playerXScore = document.querySelector('#player-x-score')
    const playerOScore = document.querySelector('#player-o-score')
    // buttons
    const startBtn = document.querySelector('#start')
    const restartBtn = document.querySelector('#restart')
    // functions
    function updateStatus(player){
        status.textContent = `Player ${player.piece}'s Turn`
    }
    function updateScores(){
        playerXScore.textContent = playerX.score
        playerOScore.textContent = playerO.score
    }
    function updateUI(){
        updateScores()
        winnerTxt.classList.toggle('hidden')
        status.classList.toggle('hidden')
        restartBtn.classList.toggle('hidden')
    }

    function playAgain(board){
        board.winner = ''
        board.roundCount = 0

        //clear board
        for(let i=0; i<space.length; i++){
            space[i].textContent=''
        }
        //clear player taken space
        playerX.takenSpace = []
        playerO.takenSpace = []
        updateStatus(board.currentPlayer())
        winnerTxt.classList.add('hidden')
        status.classList.remove('hidden')
    }
    class player {
        constructor(piece){
            this.piece = piece
            this.takenSpace = []
            this.score = 0
        }
    }
    class gameBoard{
        constructor(){
            this.winner = ''
            this.roundCount = 0
            this.winOrder = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
        }

        appendToPlayer(cell){
            space[cell].textContent = this.currentPlayer().piece
            this.currentPlayer().takenSpace.push(cell+1)
        }
        
        putPiece(){
        }

        currentPlayer(){
            return this.roundCount%2==0? playerX:playerO
        }

        checkWinner(player){
          return this.winOrder.some((x)=>{return x.toString()==player.takenSpace.filter((e)=>{return x.includes(e)}).sort((a,b)=>{return a-b}).toString()
            })  
        }
        checkDraw(){
            return this.roundCount==8
        }
    }
    console.log('script-class.js');
    const playerX = new player("X")
    const playerO = new player("O")
    startBtn.addEventListener('click',function(){
        const thisGameBoard = new gameBoard
        // for start
        winnerTxt.classList.add('hidden')
        status.classList.remove('hidden')
        updateStatus(thisGameBoard.currentPlayer())
        
        function gameLoop(){
            for(let i=0; i<space.length; i++){
                space[i].addEventListener('click',function(){
                    const currentPlayer = thisGameBoard.currentPlayer()
                    if(space[i].textContent=='' && thisGameBoard.winner==''){
                         // console.log(i);
                        console.log(thisGameBoard.roundCount);
                        thisGameBoard.appendToPlayer(i)
                        console.log(`PLAYER ${currentPlayer.piece} PIECES ${currentPlayer.takenSpace}`);
            
                        if(thisGameBoard.checkWinner(currentPlayer)){
                            console.log(`WINNER === Player ${currentPlayer.piece}`);
                            thisGameBoard.winner = currentPlayer
                            winnerTxt.textContent = `Player ${currentPlayer.piece} IS THE WINNER!!!`
                            currentPlayer.score++
                            console.log(`Player X: ${playerX.score} \\\ Player OP: ${playerO.score}`);
                            updateScores()
                            updateUI()                
                        }
                        if(thisGameBoard.checkDraw()){
                            console.log(`DRAW DRAW DRAW`);
                            winnerTxt.textContent = `It's a DRAW!`
                            updateScores()
                            updateUI()
                        }
                        thisGameBoard.roundCount ++ 
                        updateStatus(thisGameBoard.currentPlayer())
                    }
                })
            }
        }
        gameLoop()
        startBtn.classList.toggle('hidden')
        restartBtn.addEventListener('click',function(){
            playAgain(thisGameBoard)
            gameLoop()
            restartBtn.classList.toggle('hidden')
        })
    })

})()