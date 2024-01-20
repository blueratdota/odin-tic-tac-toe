
(()=>{
    
    (()=>{
        const startBtn = document.querySelector('#start')
        const restartBtn = document.querySelector('#restart')
    
        startBtn.addEventListener('click',function(){
            console.log('start');
            gameLoop()
        })
        restartBtn.addEventListener('click',function(){
            console.log('clicked');
        })

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






    function player(boardPiece){ //FACTORY FUNCTION --- pwede ma modify
        const takenSpace = []
        const appendSpace = function(){
            const space = document.querySelectorAll('.space')
            for(let i=0; i<space.length; i++){
            space[i].addEventListener('click',function(){
                console.log(`${i+1} IS CLICKED`);
            }) 
        }
        }
        const status = ''
        return {boardPiece,takenSpace,appendSpace}
    }

    function gameBoard(){
        const playerX = player('X')
        const playerO = player('O')

        return{
            playerX,
            playerO,
            
            hasWinner: function(){
                function checkWinner(player){
                    return winConditions.winOrder.some((x)=>{
                        return x.toString()==player.takenSpace.filter((e)=>{
                            return x.includes(e)}).toString()
                    })
                }
                return (checkWinner(this.playerO)||checkWinner(this.playerX))

            },

            gameLogic: function(){
                const currentPlayer = ()=>{return winConditions.stepCounter%2==0? playerX:playerO}
                console.log(`${currentPlayer().boardPiece} === ${currentPlayer().takenSpace}`)
                currentPlayer().appendSpace() 
            }
        }
    }

    function gameLoop(){
        const theGameBoard = gameBoard()


        for(let i=winConditions.stepCounter;i<10;){
            if(theGameBoard.hasWinner()){
                console.log(`${theGameBoard.gameLogic().currentPlayer().boardPiece} WINS!!!`);
                break
            }
            else if(winConditions.availableSpace.length == 0){
                console.log('===DRAW===');
                break
            }
            else{
                theGameBoard.gameLogic()
            }
        }

    }

})()