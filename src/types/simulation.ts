export interface Point {
  x: number;
  y: number;
}

export interface Robot {
  position: Point;
  orientation: number;
  path: Point[];
}

export interface MapCell {
  isWall: boolean;
  isExplored: boolean;
  confidence: number;
}

export interface SimulationState {
  map: MapCell[][];
  robot: Robot;
  mapSize: { width: number; height: number };
  isRunning: boolean;
}

export interface SimulationConfig {
  mapWidth: number;
  mapHeight: number;
  wallDensity: number;
  sensorRange: number;
  movementSpeed: number;
  scanFrequency: number;
}