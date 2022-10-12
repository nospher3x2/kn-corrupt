
declare class MissileClient extends GameObject {
    casterHandle: number;
    startPosition: Vector3;
    endPosition: Vector3;
    targetHandle: number;
    target: GameObject;
    caster: GameObject;
    missileSpeed: number;
    spellData: SpellData;
    movement: MissileMovement;
}
