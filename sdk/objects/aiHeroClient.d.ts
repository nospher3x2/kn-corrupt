declare class AIHeroClient extends AIBaseClient {
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
    stats: HeroStats

    isSpellEvolved(slot: SpellSlot | number): boolean
    getManaCost(slot: SpellSlot | number): number
    move(position: Vector3, drawClick: boolean): boolean
    move(position: Vector3, drawClick: boolean, triggerEvent: boolean, ignoreLimit: boolean): boolean
    attack(target: AttackableUnit): boolean
    attack(target: AttackableUnit, triggerEvent: boolean, ignoreLimit: boolean): boolean
    castSpell(slot: SpellSlot | number, triggerEvent: boolean, ignoreLimit: boolean): boolean
    castSpell(slot: SpellSlot | number): boolean
    castSpell(slot: SpellSlot | number, target: AIHeroClient | AttackableUnit | GameObject): void
    castSpell(slot: SpellSlot | number, target: AIHeroClient | AttackableUnit | GameObject, triggerEvent: boolean, ignoreLimit: boolean): void
    castSpell(slot: SpellSlot | number, startPosition: Vector3, endPosition: Vector3, triggerEvent: boolean, ignoreLimit: boolean): void
    castSpell(slot: SpellSlot | number, startPosition: Vector3, endPosition: Vector3): void
    castSpell(slot: SpellSlot | number, position: Vector3): void
    castSpell(slot: SpellSlot | number, position: Vector3, triggerEvent: boolean, ignoreLimit: boolean): void
    updateChargeableSpell(slot: SpellSlot | number, position: Vector3): boolean
    levelSpell(slot: SpellSlot | number): void
    doEmote(emote: Emote | number): void
    buyItem(itemId: number): number
    spellSlotCanBeUpgraded(slot: SpellSlot | number): boolean
    /**
     * 
     * @param position - Position to move missile to
     */
    setYuumiQ(position: Vector3): boolean
}

