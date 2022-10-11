declare class keyboard {
    isKeydown( key: number ): boolean
    keyCodeToString( key: number ): string
}

declare global {
    const keyboard : keyboard; 
}

export {};