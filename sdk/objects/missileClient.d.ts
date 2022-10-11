
declare class missileClient extends gameObject{
    casterHandle: number;
    startPosition: number;
    endPosition: number;
    targetHandle: number;
    target: gameObject;
    caster: gameObject;
    missileSpeed: number;
    spellData: spellData;
    movement: missileMovement;
}
