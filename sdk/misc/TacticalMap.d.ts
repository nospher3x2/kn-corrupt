
declare class TacticalMap {
    position: Vector3;
    size: number;

    /** @noSelf **/
    worldToMap(worldPos: Vector3): Vector2

    /** @noSelf **/
    isOnMap(worldPos: Vector3, radius: number, color: number): boolean
    /** @noSelf **/
    isOnMap(screenPos: Vector2): boolean
    /** @noSelf **/
    drawCircle(worldPos: Vector3, radius: number, color: number): boolean
}