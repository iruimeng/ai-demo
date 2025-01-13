import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import './Game.css';

const Game = () => {
  const [snake, setSnake] = useState([{x: 15, y: 15}, {x: 14, y: 15}, {x: 13, y: 15}]);
  const [food, setFood] = useState({x: 5, y: 5});
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * 30),
      y: Math.floor(Math.random() * 30)
    };
    setFood(newFood);
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = {...newSnake[0]};

    switch (direction) {
      case 'RIGHT': head.x += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      default: break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30) {
      setGameOver(true);
      return;
    }

    // Check collision with self
    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, gameOver, food]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="game-container">
      <h1>React Snake Game</h1>
      <GameBoard snake={snake} food={food} />
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
};

export default Game;
