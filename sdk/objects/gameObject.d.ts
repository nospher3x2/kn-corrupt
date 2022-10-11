declare class gameObject {
    handle: number;
    team: number;
    name: string;
    networkId: number;
    minBoundingBox: vec3;
    maxBoundingBox: vec3;
    position: vec3;
    pos: vec3;
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
    asAttackableUnit: attackableUnit;
    asHero: aiHeroClient;
    asMinion: aiMinionClient;
    asMissile: missileClient;
    asAIBase: aiBaseClient;
    asTurret: aiTurretClient;
    asCamp: neutralMinionCamp;
    boundingRadius: number;
    isOnScreen: boolean;
    isEnemy: boolean;
    isAlly: boolean;
    objFlags: number;
    isValid: boolean;

    isType( type: GameObjectType ): boolean
    distance( x: gameObject|vec3 ): number
}
