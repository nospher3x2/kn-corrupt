declare class chat {
    startIndex: number
    index: number
    size: number

    /** @noSelf **/
    showChat( message: string, flags?: number ): void
    /** @noSelf **/
    sendChat( message: string ): void
    /** @noSelf **/
    message( i: number ): string
}

declare global {
    const chat : chat; 
}

export { };