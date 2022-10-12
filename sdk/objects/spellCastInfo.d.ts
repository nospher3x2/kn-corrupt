declare class SpellCastInfo {
    level: number;
    startPosition: Vector3;
    startPos: Vector3;
    endPosition: Vector3;
    endPos: Vector3;
    castDelay: number;
    delay: number;
    isBasicAttack: boolean;
    isSpecialAttack: boolean;
    slot: number;
    hasTarget: boolean;
    owner: GameObject;
    target: GameObject;
    castEndTime: number;
    name: string;
    hash: number;
    missileSpeed: number;
    castRange: number;
    startHeight: number;
}
