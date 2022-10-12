
declare class MissileClient extends GameObject {
    casterHandle: number;
    startPosition: number;
    endPosition: number;
    targetHandle: number;
    target: GameObject;
    caster: GameObject;
    missileSpeed: number;
    spellData: SpellData;
    movement: MissileMovement;
}
