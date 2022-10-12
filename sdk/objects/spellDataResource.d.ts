declare class SpellDataResource {
    flags: number
    affectsTypeFlags: number
    affectsStatusFlag: number
    scriptName: string
    alternateName: string
    animationName: string
    castTime: number
    delayCastOffsetPercent: number
    delayTotalTimePercent: number
    consideredAutoAttack: boolean
    canMoveWhileChanneling: boolean
    isToggleSpell: boolean
    castConeAngle: number
    castConeDistance: number
    missileSpeed: number
    missileWidth: number
    lineDragLength: number
    haveHitBone: boolean
    hitBoneName: string
    spellRevealsChampions: boolean
    doesntBreakChannels: boolean

    /**
     * @param level - current level of the spell - 1, max 6
     */
    cooldownTime(level: number): number

    /**
     * @param level - current level of the spell - 1
     */
    castRange(level: number): number

    /**
     * @param level - current level of the spell - 1
     */
    castRangeDisplayOverride(level: number): number

    /**
    * @param level - current level of the spell - 1
    */
    castRadius(level: number): number

    /**
    * @param level - current level of the spell - 1
    */
    resourceCost(level: number): number
}

