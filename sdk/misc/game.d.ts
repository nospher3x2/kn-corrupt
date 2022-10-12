declare class Game {
    cursorPos: Vector3;
    cameraPos: Vector3;
    cameraHeight: number;
    isWindowFocused: boolean;
    latency: number;
    time: number;
    tickID: number;
    hoveredObj: GameObject;
    mapID: MapId;
    mode: GameMode;
    state: GameState;
    resolution: Vector2;
    id: number

    /** @noSelf **/
    overrideOrder(overridable_obj: Vector3 | AttackableUnit): void
    /** @noSelf **/
    showPing(position: Vector3, type: PingType, playSound: boolean, target?: GameObject, sender?: GameObject): boolean
    /** @noSelf **/
    sendPing(position: Vector3, type: PingType): boolean
}