declare class TargetSelector {
    selected: GameObject | AIHeroClient | AttackableUnit | AIBaseClient;

    /** @noSelf **/
    getResult(filter: Function, ignoreSelected: boolean, hard: boolean): GameObject | AIHeroClient | AttackableUnit
    /** @noSelf **/
    setSelected(unit: AIHeroClient): void
    /** @noSelf **/
    getInRange(range: number): GameObject | AIHeroClient | AttackableUnit
    /** @noSelf **/
    getTargets(): GameObject[] | AIHeroClient[] | AttackableUnit[]
}