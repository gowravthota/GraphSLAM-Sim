import React from 'react';
import { Settings, Play, Pause, RefreshCw } from 'lucide-react';
import { SimulationConfig } from '../types/simulation';

interface Props {
  config: SimulationConfig;
  isRunning: boolean;
  onConfigChange: (config: SimulationConfig) => void;
  onToggleSimulation: () => void;
  onReset: () => void;
}

const ConfigPanel: React.FC<Props> = ({
  config,
  isRunning,
  onConfigChange,
  onToggleSimulation,
  onReset,
}) => {
  const handleChange = (key: keyof SimulationConfig, value: number) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg space-y-6 w-80">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuration
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onToggleSimulation}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Map Size: {config.mapWidth}x{config.mapHeight}
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={config.mapWidth}
            onChange={(e) => handleChange('mapWidth', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Wall Density: {(config.wallDensity * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.wallDensity * 100}
            onChange={(e) => handleChange('wallDensity', parseInt(e.target.value) / 100)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sensor Range: {config.sensorRange}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={config.sensorRange}
            onChange={(e) => handleChange('sensorRange', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Movement Speed: {config.movementSpeed}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={config.movementSpeed}
            onChange={(e) => handleChange('movementSpeed', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scan Frequency: {config.scanFrequency}Hz
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={config.scanFrequency}
            onChange={(e) => handleChange('scanFrequency', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;