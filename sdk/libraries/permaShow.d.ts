
declare class permaShow {
/** @noSelf **/
    create( key: string, displayName: string, position: vec2 ): typeof permaShowWindow
    /** @noSelf **/
    delete( key: string ): void
}

declare global {
    const permaShow : permaShow;
}

export {};