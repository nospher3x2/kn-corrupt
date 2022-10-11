declare class orb {
    canAction: boolean;
    canAttack: boolean;
    isMovePaused: boolean;
    isAttackPaused: boolean;
    isPaused: boolean;
    isLaneClearWaiting: boolean;
    getLaneClearTarget: attackableUnit;
    getLastHitTarget: attackableUnit;
    isComboActive: boolean;
    comboKeyDown: boolean;
    laneClearKeyDown: boolean;
    lastHitKeyDown: boolean;
    fleeKeyDown: boolean;
    harassKeyDown: boolean;
    currentAttackTarget: attackableUnit;
    comboTarget: attackableUnit;
    mode: OrbMode;

    /** @noSelf **/
    reset( ): void
    /** @noSelf **/
    setMovePause( time: number ): void
    /** @noSelf **/
    setAttackPause( time: number ): void
    /** @noSelf **/
    setPause( time: number ): void
    /** @noSelf **/
    setServerPause( ): void
    /** @noSelf **/
    setServerAttackPause( ): void
    load( ): void
    unload( ): void
    /** @noSelf **/
    setIgnore( unit: attackableUnit, time: number ): void
    /** @noSelf **/
    getMissileSpeed( unit: aiBaseClient ): number
    /** @noSelf **/
    setLaneClearTarget( unit: attackableUnit ): void
    /** @noSelf **/
    setLastHitTarget( unit: attackableUnit ): void
    /** @noSelf **/
    getHitTime( source: aiBaseClient, target: aiBaseClient ): number
    /** @noSelf **/
    predictHP( unit: aiBaseClient, time: number ): number
    /** @noSelf **/
    orbwalkTo( position: vec3, target: attackableUnit ): void
    /** @noSelf **/
    setComboTarget( unit: attackableUnit ): void
    /** @noSelf **/
    getAttackSpeed( unit: attackableUnit ): number
}

declare global {
    const orb : orb;
}

export {};