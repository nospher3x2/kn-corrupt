declare class attackableUnit extends gameObject {
    resource: number;
    maxResource: number;
    mana: number;
    maxMana: number;
    manaPercent: number;
    resourceEnabled: boolean;
    resourceType: ResourceType;
    secondaryResource: number;
    maxSecondaryResource: number;
    secondaryResourceEnabled: boolean;
    secondaryResourceType: ResourceType;
    statusFlags: GameObjectStatusFlags;
    isTargetable: boolean;
    isTargetableToTeamFlags: number;
    health: number;
    maxHealth: number;
    healthMaxPenalty: number;
    allShield: number;
    physicalShield: number;
    magicalShield: number;
    championSpecificHealth: number;
    incomingHealingAllied: number;
    incomingHealingEnemy: number;
    stopShieldFade: number;
    isDead: boolean;
    owner: gameObject;
    isInvulnerable: boolean;
    isMagicImmune: boolean;
    isPhysicalImmune: boolean;
    healthPercent: number;
    resourcePercent: number;
    secondaryResourcePercent: number;
    path: path;
    isZombie: boolean;

    addGlow( color: number, thickness: number, blur: number ): boolean
    isValidTarget( range: number, onlyEnemy: boolean, from: vec3 ): boolean
}