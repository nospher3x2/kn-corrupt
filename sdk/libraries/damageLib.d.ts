declare class damageLib {

    /** @noSelf **/
    physical( source: aiBaseClient|gameObject, target: attackableUnit, amount: number ): number
    /** @noSelf **/
    magical( source: aiBaseClient|gameObject, target: attackableUnit, amount: number ): number
    /** @noSelf **/
    autoAttack( source: aiBaseClient, target: attackableUnit ): number
}

declare global {
    const damageLib: damageLib;
}

export {};