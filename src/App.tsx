import React, { useState, useCallback, useEffect } from 'react';
import { SimulationState, SimulationConfig } from './types/simulation';
import { generateRandomMap, findValidStartPosition } from './utils/mapGenerator';
import SimulationCanvas from './components/SimulationCanvas';
import ConfigPanel from './components/ConfigPanel';

const initialConfig: SimulationConfig = {
  mapWidth: 30,
  mapHeight: 30,
  wallDensity: 0.3,
  sensorRange: 5,
  movementSpeed: 5,
  scanFrequency: 10,
};

function App() {
  const [config, setConfig] = useState<SimulationConfig>(initialConfig);
  const [simulation, setSimulation] = useState<SimulationState>(() => {
    const walls = generateRandomMap(config.mapWidth, config.mapHeight, config.wallDensity);
    const startPos = findValidStartPosition(walls);
    
    return {
      map: walls.map(row => row.map(isWall => ({
        isWall,
        isExplored: false,
        confidence: 0,
      }))),
      robot: {
        position: startPos,
        orientation: 0,
        path: [startPos],
      },
      mapSize: {
        width: config.mapWidth,
        height: config.mapHeight,
      },
      isRunning: false,
    };
  });

  const resetSimulation = useCallback(() => {
    const walls = generateRandomMap(config.mapWidth, config.mapHeight, config.wallDensity);
    const startPos = findValidStartPosition(walls);
    
    setSimulation({
      map: walls.map(row => row.map(isWall => ({
        isWall,
        isExplored: false,
        confidence: 0,
      }))),
      robot: {
        position: startPos,
        orientation: 0,
        path: [startPos],
      },
      mapSize: {
        width: config.mapWidth,
        height: config.mapHeight,
      },
      isRunning: false,
    });
  }, [config]);

  const toggleSimulation = () => {
    setSimulation(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  useEffect(() => {
    if (!simulation.isRunning) return;

    const interval = setInterval(() => {
      setSimulation(prev => {
        // Simple random walk for demonstration
        const possibleMoves = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ];

        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const newX = prev.robot.position.x + move.dx;
        const newY = prev.robot.position.y + move.dy;

        // Check if the move is valid
        if (
          newX > 0 && newX < prev.mapSize.width - 1 &&
          newY > 0 && newY < prev.mapSize.height - 1 &&
          !prev.map[newY][newX].isWall
        ) {
          const newPosition = { x: newX, y: newY };
          const newOrientation = Math.atan2(move.dy, move.dx);

          // Update explored areas
          const newMap = [...prev.map];
          for (let dy = -config.sensorRange; dy <= config.sensorRange; dy++) {
            for (let dx = -config.sensorRange; dx <= config.sensorRange; dx++) {
              const scanX = newX + dx;
              const scanY = newY + dy;
              
              if (
                scanX >= 0 && scanX < prev.mapSize.width &&
                scanY >= 0 && scanY < prev.mapSize.height
              ) {
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= config.sensorRange) {
                  const cell = newMap[scanY][scanX];
                  cell.isExplored = true;
                  cell.confidence = Math.min(1, cell.confidence + 0.1);
                }
              }
            }
          }

          return {
            ...prev,
            map: newMap,
            robot: {
              ...prev.robot,
              position: newPosition,
              orientation: newOrientation,
              path: [...prev.robot.path, newPosition],
            },
          };
        }

        return prev;
      });
    }, 1000 / config.scanFrequency);

    return () => clearInterval(interval);
  }, [simulation.isRunning, config]);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">SLAM Simulation Platform</h1>
        
        <div className="flex gap-8">
          <div className="flex-1">
            <SimulationCanvas
              simulation={simulation}
              cellSize={20}
            />
          </div>
          
          <ConfigPanel
            config={config}
            isRunning={simulation.isRunning}
            onConfigChange={setConfig}
            onToggleSimulation={toggleSimulation}
            onReset={resetSimulation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;