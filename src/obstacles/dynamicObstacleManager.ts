import { DynamicObstacle, ObstacleState } from '../types/obstacles';
import { Point3D } from '../types/visualization';

export class DynamicObstacleManager {
  private obstacles: DynamicObstacle[] = [];
  private lastUpdate: number = Date.now();

  addObstacle(obstacle: DynamicObstacle): void {
    this.obstacles.push(obstacle);
  }

  update(): void {
    const now = Date.now();
    const dt = (now - this.lastUpdate) / 1000;
    
    this.obstacles = this.obstacles.map(obstacle => ({
      ...obstacle,
      position: this.updatePosition(obstacle, dt)
    }));
    
    this.lastUpdate = now;
  }

  private updatePosition(obstacle: DynamicObstacle, dt: number): Point3D {
    if (obstacle.type === 'moving') {
      return {
        x: obstacle.position.x + obstacle.velocity.x * dt,
        y: obstacle.position.y + obstacle.velocity.y * dt,
        z: obstacle.position.z + obstacle.velocity.z * dt
      };
    } else {
      // Periodic movement (e.g., circular pattern)
      const angle = Date.now() / 1000;
      return {
        x: obstacle.position.x + Math.cos(angle) * obstacle.radius,
        y: obstacle.position.y,
        z: obstacle.position.z + Math.sin(angle) * obstacle.radius
      };
    }
  }

  getState(): ObstacleState {
    return {
      obstacles: [...this.obstacles],
      lastUpdate: this.lastUpdate
    };
  }
}