declare class evade {
    isActive: boolean;
    spells: evadeSkillshot[];
    
    /**
     * 
     * @param position 
     * @returns {boolean} - Whether the position is safe
     */
    isPositionSafe( position: vec3 ): boolean
    
    /**
     * 
     * @param position 
     * @param speed 
     * @param delay 
     * @param unit 
     * @returns {boolean} - Whether the path is safe
     */
    isPathSafe( position: vec3, speed: number, delay: number, unit: aiBaseClient ): boolean
    /** @noSelf **/
    isAboutToHit( time: number, unit: aiBaseClient ): boolean
    /** @noSelf **/
    setEnabled( enabled: boolean ): void
    /** @noSelf **/
    getEnabled( ): boolean
    load( ): void
    unload( ): void
}

declare global {
    const evade : evade;
}

export {};