

declare class predResult {
    data: predData;
    castPosition: vec3;
    timeToTarget: number;
    travelDistance: number;
    distance: number;
    hitChance: HitChance;
    collidedObjects: gameObject[];
}
