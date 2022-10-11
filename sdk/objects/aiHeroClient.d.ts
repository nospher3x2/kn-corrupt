declare class aiHeroClient extends aiBaseClient  {
    gold: number;
    totalGold: number;
    minimumGold: number;
    evolvePoints: number;
    evolveFlag: number;
    visionScore: number;
    shutdownValue: number;
    baseGoldGivenOnDeath: number;
    neutralMinionsKilled: number;
    intputLocks: number;
    respawnTime: number;
    isWindingUp: boolean;
    stats: heroStats

    isSpellEvolved( slot: SpellSlot | number ): boolean
    getManaCost( slot: SpellSlot | number ): number
    move( position: vec3, drawClick: boolean ): boolean
    move( position: vec3, drawClick: boolean, triggerEvent: boolean, ignoreLimit: boolean ): boolean
    attack( target: attackableUnit ): boolean
    attack( target: attackableUnit, triggerEvent: boolean, ignoreLimit: boolean ): boolean
    castSpell( slot: SpellSlot  | number, triggerEvent: boolean, ignoreLimit: boolean ): boolean
    castSpell( slot: SpellSlot | number ): boolean
    castSpell( slot: SpellSlot | number, target: aiHeroClient|attackableUnit|gameObject ): void
    castSpell( slot: SpellSlot | number, target: aiHeroClient|attackableUnit|gameObject, triggerEvent: boolean, ignoreLimit: boolean ): void
    castSpell( slot: SpellSlot | number, startPosition: vec3, endPosition: vec3, triggerEvent: boolean, ignoreLimit: boolean ): void
    castSpell( slot: SpellSlot | number, startPosition: vec3, endPosition: vec3 ): void
    castSpell( slot: SpellSlot | number, position: vec3 ): void
    castSpell( slot: SpellSlot | number, position: vec3, triggerEvent: boolean, ignoreLimit: boolean ): void
    updateChargeableSpell( slot: SpellSlot | number, position: vec3 ): boolean
    levelSpell( slot: SpellSlot | number ): void
    doEmote( emote: Emote  | number ): void
    buyItem( itemId: number ): number
    spellSlotCanBeUpgraded(slot: SpellSlot|number): boolean
    /**
     * 
     * @param position - Position to move missile to
     */
    setYuumiQ(position: vec3): boolean
}

