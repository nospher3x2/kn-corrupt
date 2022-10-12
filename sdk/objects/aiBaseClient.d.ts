declare class AIBaseClient extends AttackableUnit {
    teleportName: string;
    teleportType: TeleportType;
    combatType: CombatType;
    direction: Vector3;
    buffs: LuaTable<Buff>;
    attackData: SpellCastInfo;
    characterData: CharacterData;
    baseCharacterData: CharacterData;
    skinName: string;
    experience: number;
    level: number;
    characterIntermediate: CharacterIntermediate;
    isMelee: boolean;
    isRanged: boolean;
    basicAttack: SpellData;
    activeSpell: SpellCastInfo;
    canAttack: boolean;
    attackDelay: number;
    attackCastDelay: number;
    baseHealth: number;
    bonusHealth: number;
    iconSquare: any;
    iconCircle: any;
    totalAttackDamage: number;
    totalBonusAttackDamage: number;
    totalAbilityPower: number;
    skinHash: number;
    isDragon: boolean;
    isBaron: boolean;
    isPlant: boolean;
    isLaneMinion: boolean;
    isSiegeMinion: boolean;
    isLargeMonster: boolean;
    isEpicMonster: boolean;
    isPet: boolean;
    isWard: boolean;
    healthBarPosition: Vector2;
    characterDataStack: CharacterDataStack;
    isHealthBarVisible: boolean;
    actionState: number;
    characterState: CharacterState;
    isRecalling: boolean;
    isCastingInterruptibleSpell: SpellPriority;
    skillTrainingPoints: number
    totalAd: number
    totalAp: number

    getSpell(slot: SpellSlot | number): SpellObject
    spellSlot(slot: SpellSlot | number): SpellObject
    getSpellState(slot: SpellSlot | number): number
    getItemID(slot: SpellSlot | number): number
    hasItem(itemID: number): boolean
    getItemSpellSlot(itemID: number): SpellSlot
    getItemStacks(itemID: number): number
    findBuff(buffName: string): Buff
    hasBuffOfType(type: BuffType): boolean
    setSkin(skinName: string, skinID: number): void
    bonePosition(boneName: string): Vector3
    getBaseHealthAtLevel(level: number): number
    drawDamage(damage: number, color: number): void
    isInAttackRange(target: GameObject): boolean
    getAttackRange(target: GameObject): number
    useObject(target: AttackableUnit): boolean
    canuseObjectReason(object: AttackableUnit): number
    canUseObject(object: AttackableUnit): boolean
    useObjectCooldownMax(object: AttackableUnit): number
}

