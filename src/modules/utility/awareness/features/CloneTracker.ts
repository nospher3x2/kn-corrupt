
class CloneTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: CloneTracker.onDraw, type: cb.draw },
        { function: CloneTracker.onCreateObject, type: cb.create }
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of CloneTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        CloneTracker.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static cache = new LuaTable<number, number>(); // networkId clone, createdAt time

    /** @noSelf */
    public static onDraw(): void {
        for (const [networkId] of CloneTracker.cache) {
            const clone = objManager.getNetworkObject(networkId);
            if (!clone || !clone.isValid || clone.asAIBase.isDead) {
                CloneTracker.cache.delete(networkId);
                continue;
            }

            if (!clone.isOnScreen) continue;

            const position = clone.asAIBase.bonePosition("head");
            graphics.drawTextStroke(
                "** CLONE **",
                CloneTracker.menu.getByKey("textSize").value,
                position,
                CloneTracker.menu.getByKey("textColor").value
            );
            graphics.drawCircleRainbow(clone.position, 100, 1, 1);
        }
    }

    /** @noSelf */
    public static onCreateObject(object: GameObject) {
        if (!object || !object.isValid || !object.isAttackableUnit) return;
        if (object.asAIBase.level != 0 || !object.asAttackableUnit.owner) return;

        if (!object.asAIBase.isPet && object.asAttackableUnit.owner.name == object.asAIBase.skinName) {
            chat.showChat(`Created clone: ${object.asAIBase.skinName}`)
            CloneTracker.cache.set(object.networkId, game.time);
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        CloneTracker.menu = menu.header("CloneTracker", "Clone Tracker");
        const status = CloneTracker.menu.boolean("status", "Enabled", true, CloneTracker.callbackMenu);
        CloneTracker.menu.slider("textSize", "Text Size", 20, 0, 100, 1);
        CloneTracker.menu.color("textColor", "Color", graphics.rgba(255, 0, 0, 150));
        status.tooltip("Show which enemy is a clone.");

        CloneTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        CloneTracker.updateCallbacks(false);
        menu.delete("CloneTracker");
    }

}

export { CloneTracker };