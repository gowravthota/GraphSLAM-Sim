import React from 'react';
import { Settings } from 'lucide-react';
import { SLAMAlgorithm } from '../types/algorithms';

interface Props {
  selectedAlgorithm: SLAMAlgorithm;
  onAlgorithmChange: (algorithm: SLAMAlgorithm) => void;
}

const AlgorithmSelector: React.FC<Props> = ({ selectedAlgorithm, onAlgorithmChange }) => {
  const algorithms: SLAMAlgorithm[] = ['EKF', 'GraphBased', 'ORB', 'DSO', 'RTABMap'];

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
        <Settings className="w-5 h-5" />
        SLAM Algorithm
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {algorithms.map((algorithm) => (
          <button
            key={algorithm}
            onClick={() => onAlgorithmChange(algorithm)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedAlgorithm === algorithm
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {algorithm}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;