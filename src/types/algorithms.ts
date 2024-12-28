export type SLAMAlgorithm = 'EKF' | 'GraphBased' | 'ORB' | 'DSO' | 'RTABMap';

export interface SensorConfig {
  lidarRange: number;
  lidarResolution: number;
  noiseLevel: number;
  sensorFusion: boolean;
}

export interface AlgorithmParams {
  type: SLAMAlgorithm;
  mapResolution: number;
  covarianceThreshold: number;
  loopClosureThreshold: number;
  featureExtraction: 'SIFT' | 'ORB' | 'SURF';
}

export interface PerformanceMetrics {
  trajectoryError: number;
  poseError: number;
  computationTime: number;
  memoryUsage: number;
}