
declare class minimap {
    position: vec3;
    size: number;

    /** @noSelf **/
    worldToMap( worldPos: vec3 ): vec2

    /** @noSelf **/
    isOnMap( worldPos:vec3, radius:number, color:number):boolean
    /** @noSelf **/
    isOnMap( screenPos: vec2 ): boolean
    /** @noSelf **/
    drawCircle( worldPos: vec3, radius: number, color: number ): boolean
}

declare global {
    const minimap : minimap;
}

export {};