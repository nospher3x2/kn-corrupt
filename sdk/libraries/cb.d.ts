declare class cb {
    load: number;
    unload: number;
    wndproc: number;
    draw: number;
    drawWorld: number;
    drawHUD: number;
    glow: number;
    tick: number;
    issueOrder: number;
    castSpell: number;
    gameUpdate: number;
    processSpell: number;
    basicAttack: number;
    stopCast: number;
    playAnimation: number;
    create: number;
    delete: number;
    buff: number;
    newPath: number;
    death: number;
    spawn: number;
    teleport: number;
    sendChat: number;
    orbAfterAttack: number;
    orbOutOfRange: number;
    orbPreTick: number;
    gapcloser: number;
    visionChange: number;
    executeCastFrame: number;
    chatUpdate: number;
    gameExit: number;

    /** @noSelf **/
    add( callbackId: number, func: Function ): void
    /** @noSelf **/
    remove( callbackId: number, func: Function ): void
    /** @noSelf **/
    trigger( callbackId: number, ...args : any): void
}

declare global {
    const cb : cb;
}

export { };