(()=>{

    const buttons = (()=>{
        const startBtn = document.querySelector('#start')
        const restartBtn = document.querySelector('#restart')
    
        startBtn.addEventListener('click',function(){
            console.log('start');
            gameLoop()
            startBtn.classList.toggle('hidden')
        })
        restartBtn.addEventListener('click',function(){
            console.log('clicked');
        })

        return{
            startBtn,
            restartBtn
        }

    })()

    const winConditions = (function(){
        const winOrder = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
        const availableSpace = [1,2,3,4,5,6,7,8,9]
        let stepCounter = 0 
        return{
            winOrder,
            availableSpace,
            stepCounter
        }
    })()

    function player(piece){
        const takenSpace = []
        const score = 0
        return{
            piece,
            takenSpace,
            score
        }
    }

    function gameBoard(){
        const playerX = player('X')
        const playerO = player('O')
        const currentPlayer = ()=>{return winConditions.stepCounter%2==0? playerX:playerO}
        return{
            playerX,
            playerO,
            currentPlayer,
            appendToPlayer:function(cell){
       
                console.log(`${this.currentPlayer().piece} TURN`);
                this.currentPlayer().takenSpace.push(cell+1)
                
            },
            // hasWinner: function(){
            //     function checkWinner(player){
            //         return winConditions.winOrder.some((x)=>{
            //             return x.toString()==player.takenSpace.filter((e)=>{
            //                 return x.includes(e)}).toString()
            //         })
            //     }
            //     return checkWinner(this.currentPlayer())
            // }
            hasWinner: function(){
                function checkWinner(player){
                    return winConditions.winOrder.some((x)=>{
                        return x.toString()==player.takenSpace.filter((e)=>{
                            return x.includes(e)}).sort((a,b)=>{
                                return a-b
                            }).toString()
                    })
                }
                return checkWinner(this.currentPlayer())
            }
        }
    }

    function gameLoop(){
        const theBoard = gameBoard()

        const status = document.querySelector('#status')
        const space = document.querySelectorAll('.space')
        const winnerTxt = document.querySelector('#winner')
        let winner = ''
        status.textContent = `Player ${theBoard.currentPlayer().piece}'s Turn`


        for(let i=0; i<space.length; i++){
            space[i].addEventListener('click',function(){
                if(space[i].textContent=='' && winner ==''){
                    // console.log(`${i+1} IS CLICKED`)
                    // console.log(`step counter:${winConditions.stepCounter}`)
                    theBoard.appendToPlayer(i)
                    space[i].textContent = theBoard.currentPlayer().piece
                    // console.log(`X===:${theBoard.playerX.takenSpace}`)
                    // console.log(`O===:${theBoard.playerO.takenSpace}`)
                    // console.log(`END OF ROUND:${winConditions.stepCounter}`)
    
                    if(theBoard.hasWinner()){
                        // console.log(`${theBoard.currentPlayer().piece} IS THE WINNER`);
                        winner = theBoard.currentPlayer().piece
                        winnerTxt.textContent = `Player ${winner} IS THE WINNER`
                        winnerTxt.classList.toggle('hidden')
                        status.classList.toggle('hidden')
                        buttons.restartBtn.classList.toggle('hidden')
                    }

                    else if(winConditions.stepCounter==8){
                        console.log("it's a draw");
                    }
                    winConditions.stepCounter++
                    status.textContent = `Player ${theBoard.currentPlayer().piece}'s Turn`
                }

                
            })   
        }

    }
  

})()