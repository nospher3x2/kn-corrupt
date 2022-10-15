import { round } from "../../../../utils/Round";

class DamageTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: DamageTracker.gameUpdate, type: cb.gameUpdate },
        { function: DamageTracker.onDraw, type: cb.draw }
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of DamageTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        DamageTracker.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static cache = new LuaTable<number, number>(); //networkId, damage

    /** @noSelf */
    public static onDraw(): void {
        for (const [networkId, damage] of DamageTracker.cache) {
            const object = objManager.getNetworkObject(networkId);
            if (!object.isValid || !object.asAIBase.isVisible || !object.asAIBase.isOnScreen || object.asAIBase.isDead) {
                DamageTracker.cache.delete(networkId);
                continue;
            }

            const position = object.asAIBase.bonePosition("head"); // need to fix this
            // const position = object.position;
            graphics.drawText(damage.toString(), 20, position, graphics.rgba(255, 255, 255, 255));
        }
    }

    /** @noSelf */
    public static gameUpdate(): void {
        const heroesList = objManager.heroes.enemies.list;
        for (const hero of heroesList) {
            if (!hero.asAIBase.isOnScreen || hero.asAIBase.isDead || hero.asAIBase.isInvulnerable) continue;
            
            const damage = damageLib.autoAttack(player, hero.asAttackableUnit);
            DamageTracker.cache.set(hero.asAIBase.networkId, Math.floor(damage <= 0 ? 0 : damage));
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        DamageTracker.menu = menu.header("DamageTracker", "Damage Tracker");
        const status = DamageTracker.menu.boolean("status", "Enabled", true, DamageTracker.callbackMenu);
        status.tooltip("Tracks amount of AA for killing enemy.");

        DamageTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        DamageTracker.updateCallbacks(false);
        menu.delete("DamageTracker");
    }

}

export { DamageTracker };