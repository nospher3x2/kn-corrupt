declare class DamageLib {

    /** @noSelf **/
    physical(source: AIBaseClient | GameObject, target: AttackableUnit, amount: number): number
    /** @noSelf **/
    magical(source: AIBaseClient | GameObject, target: AttackableUnit, amount: number): number
    /** @noSelf **/
    autoAttack(source: AIBaseClient, target: AttackableUnit): number
}