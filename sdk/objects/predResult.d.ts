

declare class PredResult {
    data: PredData;
    castPosition: Vector3;
    timeToTarget: number;
    travelDistance: number;
    distance: number;
    hitChance: HitChance;
    collidedObjects: GameObject[];
}
