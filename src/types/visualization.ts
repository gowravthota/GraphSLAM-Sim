export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Camera {
  position: Point3D;
  rotation: Point3D;
  zoom: number;
}

export interface ViewportConfig {
  width: number;
  height: number;
  perspective: number;
}