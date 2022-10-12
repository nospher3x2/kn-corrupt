
declare class PredData {
    object: AIBaseClient;
    position: Vector3;
    direction: Vector3;
    simulatedTime: number;
    remainingTime: number;
    isMoving: boolean;
    isDashing: boolean;
    moveSpeed: number;
}