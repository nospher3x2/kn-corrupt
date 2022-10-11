declare class pred {
    /** @noSelf **/
    getPrediction(...args: [target: aiBaseClient, input: predSpell, return_always: boolean] | [target: aiBaseClient, input: predSpell]): predResult;
    /** @noSelf **/
    positionAfterTime( target: aiBaseClient, time: number ): vec3
    /** @noSelf **/
    findSpellCollisions( target: aiBaseClient, input: predSpell, castFrom: vec3, endPosition: vec3, time: number ): aiBaseClient[]

    /**
     * 
     * @param target - Your target
     * @param time - Time in seconds
     * @returns {boolean} - true if target is CC'd in given seconds in the future
     */
    isCrowdControlled(target: aiBaseClient, time: number): boolean

    /**
     * 
     * @param target - Your target
     * @returns {number} - time the target is CC'd for
     */
    getCrowdControlledTime(target: aiBaseClient): number

    /**
     * Loads the prediction library
     */
    load(): void

    /**
     * Unloads the prediction library
     */
    unload(): void

}

declare global {
    const pred: pred;
}

export {};

declare class predSpell {
    delay?: number;
    type?: SpellType;
    rangeType?: SpellRangeType;
    range?: number;
    speed?: number;
    radius?: number;
    width?: number;
    collision?: {
        hero: SpellCollisionType
        minion: SpellCollisionType
        tower: SpellCollisionType
        extraRadius?: number
        flags?: CollisionFlags
    };
    from?: vec3;
    rangeFrom?: vec3;
    boundingRadiusMod?: boolean;
}
