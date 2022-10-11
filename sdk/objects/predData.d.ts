
declare class predData {
    object: aiBaseClient;
    position: vec3;
    direction: vec3;
    simulatedTime: number;
    remainingTime: number;
    isMoving: boolean;
    isDashing: boolean;
    moveSpeed: number;
}