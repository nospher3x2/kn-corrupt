declare class Orbwalker {
    canAction: boolean;
    canAttack: boolean;
    isMovePaused: boolean;
    isAttackPaused: boolean;
    isPaused: boolean;
    isLaneClearWaiting: boolean;
    getLaneClearTarget: AttackableUnit;
    getLastHitTarget: AttackableUnit;
    isComboActive: boolean;
    comboKeyDown: boolean;
    laneClearKeyDown: boolean;
    lastHitKeyDown: boolean;
    fleeKeyDown: boolean;
    harassKeyDown: boolean;
    currentAttackTarget: AttackableUnit;
    comboTarget: AttackableUnit;
    mode: OrbMode;

    /** @noSelf **/
    reset(): void
    /** @noSelf **/
    setMovePause(time: number): void
    /** @noSelf **/
    setAttackPause(time: number): void
    /** @noSelf **/
    setPause(time: number): void
    /** @noSelf **/
    setServerPause(): void
    /** @noSelf **/
    setServerAttackPause(): void
    load(): void
    unload(): void
    /** @noSelf **/
    setIgnore(unit: AttackableUnit, time: number): void
    /** @noSelf **/
    getMissileSpeed(unit: AIBaseClient): number
    /** @noSelf **/
    setLaneClearTarget(unit: AttackableUnit): void
    /** @noSelf **/
    setLastHitTarget(unit: AttackableUnit): void
    /** @noSelf **/
    getHitTime(source: AIBaseClient, target: AIBaseClient): number
    /** @noSelf **/
    predictHP(unit: AIBaseClient, time: number): number
    /** @noSelf **/
    orbwalkTo(position: Vector3, target: AttackableUnit): void
    /** @noSelf **/
    setComboTarget(unit: AttackableUnit): void
    /** @noSelf **/
    getAttackSpeed(unit: AttackableUnit): number
}