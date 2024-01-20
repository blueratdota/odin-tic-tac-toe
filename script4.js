(()=>{
    function player(piece){
        const takenSpace = []
        return{
            piece,
            takenSpace
        }
    }

    function gameBoard(){
        const playerX = player('X')
        const playerO = player('O')

        return{
            playerX,
            playerO,
            array: [1],
            addToPlayer: function(currentPlayer,number){
                currentPlayer.takenSpace.push(number)
                console.log(currentPlayer.takenSpace);
            },
            addToArray: function(num){
                console.log('pushed');
                this.array.push(num)
                console.log(this.array);
            },
            justLog: function(){
                console.log('this shit');
            }
        }
    }

    (()=>{
        const theBoard = gameBoard()
        theBoard.justLog()
        theBoard.addToArray(2)
        theBoard.addToArray(2)
        console.log(theBoard);
    })()
    
    
})()