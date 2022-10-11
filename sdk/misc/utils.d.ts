declare class utils {

    /** @noSelf **/
    delayAction( time: number, func: Function ): void
}

declare global {
    const utils : utils;
}

export {};