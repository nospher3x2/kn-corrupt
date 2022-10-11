
declare class navMesh {
    maxCells: number;
    cellCountX: number;
    cellCountY: number;
    cellWidth: number;
    cellHeight: number;

    /** @noSelf **/
    getTerrainHeight( x: number, y: number ): number
    /** @noSelf **/
    isBush( position: vec3 ): boolean
    /** @noSelf **/
    isWall( position: vec3 ): boolean
    /** @noSelf **/
    isBuilding( position: vec3 ): boolean
    /** @noSelf **/
    isInFOW( position: vec3 ): boolean
    /** @noSelf **/
    getCell(position : vec3) : navCell
    /** @noSelf **/
    getCell(index : number) : navCell
}

declare global {
    const navMesh : navMesh;
}

export {};