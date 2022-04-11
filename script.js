const body = document.querySelector('body')
const header = document.querySelector('.header')
let modal = document.querySelector(".modal")
let reset = document.querySelector(".reset")
let playerChoice = document.querySelector(".player")
let computerChoice = document.querySelector(".ai")
let start = document.querySelector(".start")

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
    let draw = 0;
    let ai=0;
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
    //checks if someone won
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
                draw = 1;
            }
        }
    }
    }
    //assign click events on grid squares
    const playRound = (cPlayer) =>{
        let squares = document.querySelectorAll(".square")
        squares.forEach(item =>{
                item.addEventListener('click', e => {
                    if(ai==1 && board[item.id-1]==""){console.log(board[item.id-1]); play(cPlayer,item.id); aiPlay(cPlayer)}
                    else{console.log(board[item.id-1]); play(cPlayer,item.id);}
            });
        })
        reset.addEventListener('click', () => {modal.style.display="block";})
        start.addEventListener('click', () => {clear(cPlayer); modal.style.display="none"})
    }
    //displays board content
    const displayBoard = (arr) => {
        console.log(ai)
        let i = 0;
        arr.forEach(element => {
            let squares = document.querySelectorAll(".square")
            squares[i].textContent=element;
            i++;
        })
    }
    function clear(cPlayer){
        for(let i=0;i<9;i++){
            board[i]="";
        }
        cPlayer=player1;
        pPlayer=undefined;
        //playRound(player1);
        displayBoard(board);
        if(winner==1 || draw == 1){
            winner = 0;
            draw = 0;
            header.removeChild(header.lastElementChild);
        }
    }
    //ai play logic
    const aiPlay = (cPlayer) => {
        let tempArr = [];
        for(let i=0;i<9;i++){
            if(board[i] == ""){tempArr.push(i+1);}
        }
        play(cPlayer,tempArr[Math.floor(Math.random()*tempArr.length)]);
        console.log(tempArr)
    }
    //adds click events on choice options. determines if game is VS human/AI
    playerChoice.addEventListener('click', () => {playerChoice.classList.add("chosen"); computerChoice.classList.remove("chosen"); ai=0;})
    computerChoice.addEventListener('click', () => {computerChoice.classList.add("chosen"); playerChoice.classList.remove("chosen"); ai=1;})
    return{playRound};
})();
game.playRound(player1)