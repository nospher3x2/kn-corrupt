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
    private static objectsCache = new LuaTable<number, number>(); //networkId, damage

    /** @noSelf */
    public static onDraw(): void {
        for (const [networkId, damage] of DamageTracker.objectsCache) {
            const object = objManager.getNetworkObject(networkId);
            if (object && object.asAIBase && !object.asAIBase.isDead && object.asAIBase.isOnScreen) {
                //const pos = object.asAIBase.bonePosition("head"); // need to fix this
                const pos = object.position;
                graphics.drawText(damage.toString(), 20, pos, graphics.rgba(255, 255, 255, 255));
            }
        }
    }

    /** @noSelf */
    public static gameUpdate(): void {
        const heroesList = objManager.heroes.enemies.list;
        for (const hero of heroesList) {
            if (hero.asAIBase.isDead || hero.asAIBase.isInvulnerable) continue;
            let damage = damageLib.autoAttack(hero.asAIBase, hero.asAIBase);
            if (damage <= 0) { damage = 0};
            DamageTracker.objectsCache.set(hero.asAIBase.networkId, Math.floor(damage));
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