declare class EvadeSkillshot {
    start: Vector3;
    end: Vector3;
    missilePosition: Vector3;
    spellName: string;
    polygon: Vector3[];
    range: number;
    radius: number;
    speed: number;
    isAboutToHit(time: number, unit: AIBaseClient): boolean
    isSafe(position: Vector3): boolean
}

