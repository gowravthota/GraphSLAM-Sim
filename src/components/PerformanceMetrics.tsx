import React from 'react';
import { BarChart } from 'lucide-react';
import { PerformanceMetrics as Metrics } from '../types/algorithms';

interface Props {
  metrics: Metrics;
}

const PerformanceMetrics: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
        <BarChart className="w-5 h-5" />
        Performance Metrics
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Trajectory Error:</span>
          <span className="text-white">{metrics.trajectoryError.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Pose Error:</span>
          <span className="text-white">{metrics.poseError.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Computation Time:</span>
          <span className="text-white">{metrics.computationTime.toFixed(2)}ms</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Memory Usage:</span>
          <span className="text-white">{(metrics.memoryUsage / 1024).toFixed(2)}MB</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;