declare class GameObject {
    handle: number;
    team: number;
    name: string;
    networkId: number;
    minBoundingBox: Vector3;
    maxBoundingBox: Vector3;
    position: Vector3;
    isVisible: boolean;
    isAttackableUnit: boolean;
    isHero: boolean;
    isMinion: boolean;
    isMissile: boolean;
    isAIBase: boolean;
    isTurret: boolean;
    isNexus: boolean;
    isInhib: boolean;
    isEffectEmitter: boolean;
    asAttackableUnit: AttackableUnit;
    asHero: AIHeroClient;
    asMinion: AIMinionClient;
    asMissile: MissileClient;
    asAIBase: AIBaseClient;
    asTurret: AITurretClient;
    asCamp: NeutralMinionCamp;
    boundingRadius: number;
    isOnScreen: boolean;
    isEnemy: boolean;
    isAlly: boolean;
    objFlags: number;
    isValid: boolean;

    isType(type: GameObjectType): boolean
    distance(x: GameObject | Vector3): number
}
