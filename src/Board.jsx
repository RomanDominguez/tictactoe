// Importaciones de bibliotecas y componentes
import React from "react";
import { useEffect, useState} from "react";
import "./Board.css";
import Square from "./Square";
import checkWinner from "./winner.js";
import slashPos from "./winSlash.js";

function Board() {
  // Estados del componente
  const [player, setPlayer] = useState(0);
  const [state, setState] = useState(Array(9).fill(null));
  const [isWinner, setIsWinner] = useState(false);
  const [status, setStatus] = useState("Turn: Player 0");
  const [winStyles, setWinStyles] = useState({});
  const [play, setPlay] = useState(true);


  // Función para reiniciar el juego
  const playAgain = () => {
    setPlayer(0);
    setState(Array(9).fill(null));
    setIsWinner(false);
    setStatus("Turn: Player 0");
    setWinStyles({});
    setPlay(true);
  };

  useEffect(() => {
    // Verificar si hay un ganador cuando cambia el estado del juego
    const winner = checkWinner(state);

    if (winner) {
      setStatus(`Player ${winner[0]} wins`);
      setPlay(false);
      setWinStyles(slashPos(winner[1]));
      setIsWinner(true);
    }
  }, [state]);

  // Función para actualizar el estado del juego después de que un jugador realiza un movimiento
  const newState = (idOfSquare) => {
    let thePlayer = player;
    const newState = [...state];
    newState[idOfSquare] = player;
    setState(newState);
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    setStatus(`Turn: Player ${nextplayer}`);
    return thePlayer;
  };

  // Función para renderizar un cuadrado del tablero
  function renderSquare(i) {
    return <Square id={i} newState={newState} won={isWinner} play={play} />;
  }

  // Renderizado del tablero de juego y la información del jugador
  return (
    <div className="container">
      <div className="game-board">
        <div className="slash" style={winStyles}>
          
        </div>
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="player">
        <h2>{status}</h2>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
}

export default Board;