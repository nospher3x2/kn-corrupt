declare class Evade {
    isActive: boolean;
    spells: EvadeSkillshot[];

    /**
     * 
     * @param position 
     * @returns {boolean} - Whether the position is safe
     */
    isPositionSafe(position: Vector3): boolean

    /**
     * 
     * @param position 
     * @param speed 
     * @param delay 
     * @param unit 
     * @returns {boolean} - Whether the path is safe
     */
    isPathSafe(position: Vector3, speed: number, delay: number, unit: AIBaseClient): boolean
    /** @noSelf **/
    isAboutToHit(time: number, unit: AIBaseClient): boolean
    /** @noSelf **/
    setEnabled(enabled: boolean): void
    /** @noSelf **/
    getEnabled(): boolean
    load(): void
    unload(): void
}