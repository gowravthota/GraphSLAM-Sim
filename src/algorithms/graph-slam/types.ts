export interface GraphNode {
  id: string;
  pose: { x: number; y: number; theta: number };
  covariance: number[][];
}

export interface GraphEdge {
  from: string;
  to: string;
  transform: { x: number; y: number; theta: number };
  information: number[][];
}

export interface PoseGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}