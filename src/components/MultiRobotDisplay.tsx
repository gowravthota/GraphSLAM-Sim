import React from 'react';
import { Robot } from '../multi-robot/coordinator';
import { Users } from 'lucide-react';

interface Props {
  robots: Map<string, Robot>;
}

const MultiRobotDisplay: React.FC<Props> = ({ robots }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
        <Users className="w-5 h-5" />
        Active Robots
      </h3>
      <div className="space-y-2">
        {Array.from(robots.values()).map((robot) => (
          <div key={robot.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
            <span className="text-gray-300">Robot {robot.id}</span>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-400">
                Position: ({robot.position.x.toFixed(1)}, {robot.position.y.toFixed(1)})
              </span>
              <span className="text-gray-400">
                Areas: {robot.exploredArea.size}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiRobotDisplay;