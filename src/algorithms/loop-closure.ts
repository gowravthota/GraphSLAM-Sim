import { Point } from '../types/simulation';

export class LoopClosureDetector {
  private visitedLocations: Point[] = [];
  private threshold: number = 2.0;

  detectLoopClosure(currentPos: Point): boolean {
    for (const location of this.visitedLocations) {
      const distance = this.calculateDistance(currentPos, location);
      if (distance < this.threshold) {
        return true;
      }
    }
    
    this.visitedLocations.push(currentPos);
    return false;
  }

  private calculateDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
}