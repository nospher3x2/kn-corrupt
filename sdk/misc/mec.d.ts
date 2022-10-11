
declare class mec {

    /** @noSelf **/
    find( points: vec3[] ): mecCircle
}

declare global {
    const mec: mec;
}

export {};