declare class game {
    cursorPos: vec3;
    cameraPos: vec3;
    cameraHeight: number;
    isWindowFocused: boolean;
    latency: number;
    time: number;
    tickID: number;
    hoveredObj: gameObject;
    mapID: MapId;
    mode: GameMode;
    state: GameState;
    resolution: vec2;
    id: number

    /** @noSelf **/
    overrideOrder( overridable_obj: vec3|attackableUnit ): void
    /** @noSelf **/
    showPing( position: vec3, type: PingType, playSound: boolean, target?: gameObject, sender?: gameObject ): boolean
    /** @noSelf **/
    sendPing( position: vec3, type: PingType ): boolean
}

declare global {
    const game: game;
}

export {};