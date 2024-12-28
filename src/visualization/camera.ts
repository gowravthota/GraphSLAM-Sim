import { Camera, Point3D } from '../types/visualization';

export class CameraController {
  private camera: Camera;

  constructor() {
    this.camera = {
      position: { x: 0, y: 10, z: 20 },
      rotation: { x: -0.5, y: 0, z: 0 },
      zoom: 1
    };
  }

  rotate(deltaX: number, deltaY: number): void {
    this.camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.camera.rotation.x + deltaY));
    this.camera.rotation.y += deltaX;
  }

  zoom(delta: number): void {
    this.camera.zoom = Math.max(0.1, Math.min(5, this.camera.zoom + delta));
  }

  getViewMatrix(): number[][] {
    // Implement view matrix calculation
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  }
}