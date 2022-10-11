declare class ts {
    selected: gameObject|aiHeroClient|attackableUnit|aiBaseClient;

    /** @noSelf **/
    getResult( filter: Function, ignoreSelected: boolean, hard: boolean ): gameObject|aiHeroClient|attackableUnit
    /** @noSelf **/
    setSelected( unit: aiHeroClient ): void
    /** @noSelf **/
    getInRange( range: number ): gameObject|aiHeroClient|attackableUnit
    /** @noSelf **/
    getTargets( ): gameObject[]|aiHeroClient[]|attackableUnit[]
}

declare global {
    const ts : ts;
}

export {};