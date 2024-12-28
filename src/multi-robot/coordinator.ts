import { Point } from '../types/simulation';
import { SensorReading } from '../utils/sensorSimulation';

export interface Robot {
  id: string;
  position: Point;
  observations: SensorReading[];
  exploredArea: Set<string>;
}

export class MultiRobotCoordinator {
  private robots: Map<string, Robot> = new Map();
  private sharedMap: boolean[][] = [];

  addRobot(id: string, initialPosition: Point): void {
    this.robots.set(id, {
      id,
      position: initialPosition,
      observations: [],
      exploredArea: new Set()
    });
  }

  updateRobotPosition(id: string, position: Point, observations: SensorReading[]): void {
    const robot = this.robots.get(id);
    if (robot) {
      robot.position = position;
      robot.observations = observations;
      this.mergeObservations(robot);
    }
  }

  private mergeObservations(robot: Robot): void {
    // Merge new observations into shared map
    robot.observations.forEach(obs => {
      const cellKey = this.getCellKey(robot.position, obs);
      robot.exploredArea.add(cellKey);
    });
  }

  private getCellKey(position: Point, observation: SensorReading): string {
    const x = Math.round(position.x + observation.range * Math.cos(observation.angle));
    const y = Math.round(position.y + observation.range * Math.sin(observation.angle));
    return `${x},${y}`;
  }
}