import './App.css';
import { Square } from './components/Square';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { TURNS } from './constants/constants';
import { checkEndGame, checkWinner, saveToLocalStorage, getToLocalStorage } from './utils/utils';

function App() {

  const [board, setBoard] = useState(()=>{
    const inLocal = JSON.parse(getToLocalStorage('board'));
    return inLocal ? inLocal : Array(9).fill(null);
  })

  const [turn, setTurn] = useState(()=>{
    const inLocal = JSON.parse(getToLocalStorage('turn'));
    return inLocal ? inLocal : TURNS.X;
  })

  const [winner, setWinner] = useState(null);

  const resetBoard = ()=>{
    setBoard(Array(9).fill(null));
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // Actualizar tablero
    const newBoard = [...board];
    if(newBoard[index] || winner) return;
    newBoard[index] = turn;
    setBoard(newBoard); 

    // Actualizar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    // Guardar cambios en localStorage
    saveToLocalStorage('board', newBoard);
    saveToLocalStorage('turn', newTurn);

    // Verificar ganador o si hay empate
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
