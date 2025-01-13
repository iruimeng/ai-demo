import React from 'react';

const GameBoard = ({ snake, food }) => {
  const renderCell = (x, y) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    
    let className = 'cell';
    if (isSnake) className += ' snake';
    if (isFood) className += ' food';
    
    return <div key={`${x}-${y}`} className={className} />;
  };

  const cells = [];
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 30; x++) {
      cells.push(renderCell(x, y));
    }
  }

  return (
    <div className="game-board">
      {cells}
    </div>
  );
};

export default GameBoard;
