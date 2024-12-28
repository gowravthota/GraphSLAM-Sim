export interface DynamicObstacle {
  id: string;
  position: Point3D;
  velocity: Point3D;
  radius: number;
  type: 'moving' | 'periodic';
}

export interface ObstacleState {
  obstacles: DynamicObstacle[];
  lastUpdate: number;
}