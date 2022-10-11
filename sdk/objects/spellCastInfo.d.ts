declare class spellCastInfo {
    level: number;
    startPosition: vec3;
    startPos: vec3;
    endPosition: vec3;
    endPos: vec3;
    castDelay: number;
    delay: number;
    isBasicAttack: boolean;
    isSpecialAttack: boolean;
    slot: number;
    hasTarget: boolean;
    owner: gameObject;
    target: gameObject;
    castEndTime: number;
    name: string;
    hash: number;
    missileSpeed: number;
    castRange: number;
    startHeight: number;
}
