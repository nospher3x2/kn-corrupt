
declare class ObjectManager {
    player: AIHeroClient;
    myHero: AIHeroClient;
    attackableUnits: ManagerTemplate;
    buildings: ManagerTemplate;
    inhibs: ManagerTemplate;
    aiBases: ManagerTemplate;
    turrets: ManagerTemplate;
    minions: ManagerTemplate;
    heroes: ManagerTemplate;
    missiles: ManagerTemplate;
    camps: ManagerTemplate;

    /** @noSelf **/
    findObject(position: Vector3, index: number, handle: number): GameObject
    /** @noSelf **/
    getNetworkObject(networkId: number): GameObject
}