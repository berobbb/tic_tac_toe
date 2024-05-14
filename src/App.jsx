
import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import {WINNING_COMBINATIONS} from './winning-combinations'
import GameOver from "./components/GameOver"


function deriveActivePlayer(gameTurns)
  {
      let currentPlayer='X';
      if(gameTurns.length>0&&gameTurns[0].player==='X')
      {
          currentPlayer='O';
      }
      return currentPlayer;
  }
  const initialGameaBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
]
function App() {
  const[gameTurns,setGameTurns]=useState([])
  // const[activePlayer,setActivePayer]=useState('X')
  const activePlayer=deriveActivePlayer(gameTurns)
  let gameBoard= [...initialGameaBoard.map(array=>[...array])];
  for(const turns of gameTurns){
     const{square,player}=turns;
     const{row,col}=square;
     gameBoard[row][col]=player;
  }
  let winner;
  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol==thirdSquareSymbol)
    {
       winner=firstSquareSymbol;
    }
  }
  const hasDraw=gameTurns.length==9&&!winner;
   
  function handleSelectSquare(rowIndex,colIndex)
  {
    // setActivePayer((cur)=>cur==='X'?'O':'X')
    setGameTurns(prevTurns=>{
      const currentPlayer=deriveActivePlayer(prevTurns);


      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:activePlayer},...prevTurns]
       return updatedTurns;
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'}/>
          <Player name="Player 2" symbol="O"isActive={activePlayer==='O'}/>
        </ol>
        {(winner||hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} active={activePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
