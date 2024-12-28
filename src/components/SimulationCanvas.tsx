import React, { useRef, useEffect } from 'react';
import { SimulationState } from '../types/simulation';

interface Props {
  simulation: SimulationState;
  cellSize: number;
}

const SimulationCanvas: React.FC<Props> = ({ simulation, cellSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { map, robot } = simulation;
    const width = map[0].length * cellSize;
    const height = map.length * cellSize;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Draw map
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellX = x * cellSize;
        const cellY = y * cellSize;

        if (cell.isWall) {
          ctx.fillStyle = '#4a4a4a';
        } else if (cell.isExplored) {
          ctx.fillStyle = `rgba(76, 175, 80, ${cell.confidence})`;
        } else {
          ctx.fillStyle = '#2a2a2a';
        }

        ctx.fillRect(cellX, cellY, cellSize, cellSize);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);
      });
    });

    // Draw robot path
    ctx.beginPath();
    ctx.strokeStyle = '#64b5f6';
    ctx.lineWidth = 2;
    robot.path.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x * cellSize + cellSize/2, point.y * cellSize + cellSize/2);
      } else {
        ctx.lineTo(point.x * cellSize + cellSize/2, point.y * cellSize + cellSize/2);
      }
    });
    ctx.stroke();

    // Draw robot
    const robotX = robot.position.x * cellSize + cellSize/2;
    const robotY = robot.position.y * cellSize + cellSize/2;
    
    ctx.beginPath();
    ctx.fillStyle = '#ff4081';
    ctx.arc(robotX, robotY, cellSize/3, 0, Math.PI * 2);
    ctx.fill();

    // Draw robot direction
    ctx.beginPath();
    ctx.strokeStyle = '#ff4081';
    ctx.lineWidth = 2;
    ctx.moveTo(robotX, robotY);
    ctx.lineTo(
      robotX + Math.cos(robot.orientation) * cellSize/2,
      robotY + Math.sin(robot.orientation) * cellSize/2
    );
    ctx.stroke();
  }, [simulation, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      width={simulation.mapSize.width * cellSize}
      height={simulation.mapSize.height * cellSize}
      className="border border-gray-700 rounded-lg"
    />
  );
};

export default SimulationCanvas;