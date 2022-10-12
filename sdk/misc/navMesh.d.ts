
declare class navMesh {
    maxCells: number;
    cellCountX: number;
    cellCountY: number;
    cellWidth: number;
    cellHeight: number;

    /** @noSelf **/
    getTerrainHeight( x: number, y: number ): number
    /** @noSelf **/
    isBush( position: Vector3 ): boolean
    /** @noSelf **/
    isWall( position: Vector3 ): boolean
    /** @noSelf **/
    isBuilding( position: Vector3 ): boolean
    /** @noSelf **/
    isInFOW( position: Vector3 ): boolean
    /** @noSelf **/
    getCell(position : Vector3) : NavCell
    /** @noSelf **/
    getCell(index : number) : NavCell
}

declare global {
    const navMesh : navMesh;
}

export {};