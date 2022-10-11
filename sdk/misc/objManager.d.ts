
declare class objManager {
    player: aiHeroClient;
    myHero: aiHeroClient;
    attackableUnits: managerTemplate;
    buildings: managerTemplate;
    inhibs: managerTemplate;
    aiBases: managerTemplate;
    turrets: managerTemplate;
    minions: managerTemplate;
    heroes: managerTemplate;
    missiles: managerTemplate;
    camps: managerTemplate;

    /** @noSelf **/
    findObject( position: vec3, index: number, handle: number ): gameObject
    /** @noSelf **/
    getNetworkObject( networkId: number ): gameObject
}

declare global {
    const objManager : objManager;
}

export {};