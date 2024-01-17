const gameBoard = (function(){ // IIFE'S --- pwede ma modify
    const winOrder = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
    const availableSpace = [1,2,3,4,5,6,7,8,9]
    let stepCounter = 0 
    return{winOrder,availableSpace,stepCounter}
})();

const checkWinner = function(player){ //CLOSURES
    if (gameBoard.stepCounter>=1){
        return gameBoard.winOrder.some((x)=>{
            return x.toString()==player.takenSpace.filter((e)=>{return x.includes(e)}).toString()
        })
    }
}

function gameLogic(){
    const currentPlayer = ()=>{return gameBoard.stepCounter%2==0? playerX:playerO}
    console.log(`${currentPlayer().boardPiece} === ${currentPlayer().takenSpace}`)
    currentPlayer().appendSpace() 
    console.log(checkWinner(currentPlayer()));
    
    if(checkWinner(currentPlayer())){
        console.log(`${currentPlayer().boardPiece} IS THE WINNER!!!`);
    }
    gameBoard.stepCounter++
}


function player(boardPiece){ //FACTORY FUNCTION --- pwede ma modify
    const takenSpace = []
    const appendSpace = function(){
        const askInput = prompt(gameBoard.availableSpace)
        takenSpace.push(Number(askInput))
        console.log(takenSpace);
    }
    return {boardPiece,takenSpace,appendSpace}
}

const playerX = player('X')
const playerO = player('O')




// function createGreeting(greeting = "") {
//     const myGreet = greeting.toUpperCase();
//     return function(name) {
//       return `${myGreet} ${name}`;
//     };
// }
// const sayHello = createGreeting('hello');
// const sayHey = createGreeting('hey');
// console.log(sayHello('wes'));
// console.log(sayHello('kait'));
// console.log(sayHey('kait'));

function createGame(gameName){
    let score = 0;
    return function win(){
      score ++;
      return `Your name ${gameName} score is ${score}`
    }
}
const hockeyGame = createGame('Hockey');
const soccerGame = createGame('Soccer');



// function createUser (name) {
//     const discordName = "@" + name;
  
//     let reputation = 0;
//     const getReputation = () => reputation;
//     const giveReputation = () => reputation++;
  
//     return { name, discordName, getReputation, giveReputation };
// }
  
// const josh = createUser("josh");
// josh.giveReputation();
// josh.giveReputation();
  
// console.log({
//     discordName: josh.discordName,
//     reputation: josh.getReputation()
// });

// function createPlayer (name, level) {
//     const user = createUser(name);
//     const increaseLevel = () => level++;
//     return Object.assign({}, user,{increaseLevel},level);
// }

// const joe = createPlayer('joe',10)