declare class aiBaseClient extends attackableUnit {
    teleportName: string;
    teleportType: TeleportType;
    combatType: CombatType;
    direction: vec3;
    buffs: LuaTable<buff>;
    attackData: spellCastInfo;
    characterData: characterData;
    baseCharacterData: characterData;
    skinName: string;
    experience: number;
    level: number;
    characterIntermediate: characterIntermediate;
    isMelee: boolean;
    isRanged: boolean;
    basicAttack: spellData;
    activeSpell: spellCastInfo;
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
    healthBarPosition: vec2;
    characterDataStack: characterDataStack;
    isHealthBarVisible: boolean;
    actionState: number;
    characterState: characterState;
    isRecalling: boolean;
    isCastingInterruptibleSpell: SpellPriority;
    skillTrainingPoints: number
    totalAd: number
    totalAp: number

    getSpell( slot: SpellSlot | number ): spellObject
    spellSlot( slot: SpellSlot  | number): spellObject
    getSpellState( slot: SpellSlot  | number): number
    getItemID( slot: SpellSlot | number ): number
    hasItem( itemID: number ): boolean
    getItemSpellSlot( itemID: number ): SpellSlot
    getItemStacks( itemID: number ): number
    findBuff( buffName: string ): buff
    hasBuffOfType( type: BuffType ): boolean
    setSkin( skinName: string, skinID: number ): void
    bonePosition( boneName: string ): vec3
    getBaseHealthAtLevel( level: number ): number
    drawDamage( damage: number, color: number ): void
    isInAttackRange( target: gameObject ): boolean
    getAttackRange( target: gameObject ): number
    useObject( target: attackableUnit ): boolean
    canuseObjectReason(object: attackableUnit): number
    canUseObject(object: attackableUnit): boolean
    useObjectCooldownMax(object: attackableUnit): number
}

