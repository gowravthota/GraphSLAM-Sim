import React from 'react';
import { Box } from 'lucide-react';
import { DynamicObstacle } from '../types/obstacles';

interface Props {
  obstacles: DynamicObstacle[];
  onAddObstacle: (type: 'moving' | 'periodic') => void;
  onRemoveObstacle: (id: string) => void;
}

const ObstacleControls: React.FC<Props> = ({ obstacles, onAddObstacle, onRemoveObstacle }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
        <Box className="w-5 h-5" />
        Dynamic Obstacles
      </h3>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => onAddObstacle('moving')}
            className="px-3 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Add Moving
          </button>
          <button
            onClick={() => onAddObstacle('periodic')}
            className="px-3 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Add Periodic
          </button>
        </div>
        <div className="space-y-2">
          {obstacles.map(obstacle => (
            <div key={obstacle.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <span className="text-gray-300">{obstacle.type} obstacle</span>
              <button
                onClick={() => onRemoveObstacle(obstacle.id)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObstacleControls;