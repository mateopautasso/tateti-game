import './App.css';
import { Square } from './Square';
import { useState } from 'react';
import confetti from 'canvas-confetti';

const TURNS = {
  X: "X",
  O: "O"
}
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const resetBoard = ()=>{
    setBoard(Array(9).fill(null));
    setWinner(null);
  }

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b ,c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null
  }

  const checkEndGame = (boardToCheck)=>{
      return boardToCheck.every(element => element !== null);
  } 

  const updateBoard = (index) => {
    const newBoard = [...board];
    if(newBoard[index] || winner) return;

    newBoard[index] = turn;
    setBoard(newBoard); 

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(!newWinner && checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className='board'>
      <h1>Juego del TA-TE-TI</h1>
      <div className='game'>
      {
        board.map((square,index)=>(
          <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
          >
            {square}
          </Square>
        ))
      } 
      </div>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      { winner !== null &&
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner ? 'Ha ganado el jugador:' : 'Hubo un empate!'
              }
            </h2>
            <header className='win'>
              {
                winner && <Square>{winner}</Square>
              }
            </header>
            <footer>
              <button onClick={resetBoard}>Reiniciar Tablero</button>
            </footer>
          </div>
        </section>
      }
      <button onClick={resetBoard}>Reiniciar Tablero</button>
    </main>
  )
}

export default App
