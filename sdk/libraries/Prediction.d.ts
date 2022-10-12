declare class Prediction {
    /** @noSelf **/
    getPrediction(...args: [target: AIBaseClient, input: predSpell, return_always: boolean] | [target: AIBaseClient, input: predSpell]): PredResult;
    /** @noSelf **/
    positionAfterTime(target: AIBaseClient, time: number): Vector3
    /** @noSelf **/
    findSpellCollisions(target: AIBaseClient, input: predSpell, castFrom: Vector3, endPosition: Vector3, time: number): AIBaseClient[]

    /**
     * 
     * @param target - Your target
     * @param time - Time in seconds
     * @returns {boolean} - true if target is CC'd in given seconds in the future
     */
    isCrowdControlled(target: AIBaseClient, time: number): boolean

    /**
     * 
     * @param target - Your target
     * @returns {number} - time the target is CC'd for
     */
    getCrowdControlledTime(target: AIBaseClient): number

    /**
     * Loads the prediction library
     */
    load(): void

    /**
     * Unloads the prediction library
     */
    unload(): void

}

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
    from?: Vector3;
    rangeFrom?: Vector3;
    boundingRadiusMod?: boolean;
}
