const body = document.querySelector('body')
const header = document.querySelector('.header')
//creates gameBoard object
const gameBoard=(() =>{
    let gameboard= ["","","","","","","","",""];
    return{gameboard};
})();

//player factory function
const player = (mark,player) =>{
    let currentMark = mark;
    let currentPlayer = player;
    return{currentPlayer, currentMark}
}
const player1 = player("X","cross");
const player2 = player("O","circle");

let board = gameBoard.gameboard;

const game =(() =>{
    let winner = 0;
    let pPlayer;
    let counter;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
     ];
    //checks previous player and changes next player
    const play = (cPlayer,i) =>{
        if (board[i-1]==="" && winner!=1){
            if (pPlayer === player1){
                cPlayer = player2;
            }
            else{
                cPlayer = player1
            }
            let choice = cPlayer.currentMark;
            board[i-1]=choice;
            displayBoard(board)
            winCheck(cPlayer);
            pPlayer = cPlayer;
            checkDraw();
            }
        }
    const winCheck = (cPlayer) => { 
        for(let j=0;j<8;j++){
            if(winner!=1){
            let winCondition=winningConditions[j];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
              }
            if (a === b && b === c) {
                console.log(`${cPlayer.currentPlayer} won!`)
                displayWinner(cPlayer)
                winner=1;
                break;
              }
            }
        }
    }
    //displays winner
    const displayWinner = (cPlayer) =>{
        const winner = document.createElement('h1')
        winner.textContent=(`${cPlayer.currentPlayer} won!`)
        header.appendChild(winner);
    }
    //displays if draw
    const checkDraw = () =>{
        if (winner!=1){
        for(let i=0;i<9;i++){
            if(board[i]=="") break;
            if(i==8){
                const winner = document.createElement('h1')
                winner.textContent=(`draw !`)
                header.appendChild(winner);
            }
        }
    }
    }
    //assign click events on grid squares
    const playRound = (cPlayer) =>{
        let squares = document.querySelectorAll(".square")
        squares.forEach(item =>{
            item.addEventListener('click', e => {console.log(board[item.id-1]); play(cPlayer,item.id)});
        })
    }
    //displays board content
    const displayBoard = (arr) => {
        let i = 0;
        arr.forEach(element => {
            let squares = document.querySelectorAll(".square")
            squares[i].textContent=element;
            i++;
        })
    }
    return{playRound};
})();
game.playRound(player1)


