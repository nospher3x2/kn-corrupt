
declare class Path {
    isActive: boolean;
    isDashing: boolean;
    serverPosition: Vector3;
    serverVelocity: Vector3;
    points: Vector3[];
    index: number;
    count: number;
    dashSpeed: number;

    buildPath(to: Vector3, smoothed: boolean): Vector3[]
    buildPath(from: Vector3, to: Vector3, smoothed: boolean): Vector3[]
}
