import { PoseGraph } from './types';
import { GraphOptimizer } from './optimizer';
import { Point } from '../../types/simulation';

export class GraphSlam {
  private graph: PoseGraph;
  private optimizer: GraphOptimizer;
  private currentNodeId: number = 0;

  constructor() {
    this.graph = {
      nodes: new Map(),
      edges: []
    };
    this.optimizer = new GraphOptimizer();
  }

  addNode(pose: Point, covariance: number[][]): string {
    const id = `node_${this.currentNodeId++}`;
    this.graph.nodes.set(id, {
      id,
      pose: { ...pose, theta: 0 },
      covariance
    });
    return id;
  }

  addEdge(fromId: string, toId: string, transform: Point): void {
    this.graph.edges.push({
      from: fromId,
      to: toId,
      transform: { ...transform, theta: 0 },
      information: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    });
  }

  optimize(): void {
    this.graph = this.optimizer.optimize(this.graph);
  }
}