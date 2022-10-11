
declare class path {
    isActive: boolean;
    isDashing: boolean;
    serverPosition: vec3;
    serverVelocity: vec3;
    points: vec3[];
    index: number;
    count: number;
    dashSpeed: number;

    buildPath(to : vec3, smoothed : boolean) : vec3[]
    buildPath(from : vec3, to : vec3, smoothed: boolean) : vec3[] 
}
