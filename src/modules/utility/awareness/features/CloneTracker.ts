import { round } from "../../../../utils/Round";

class CloneTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: CloneTracker.onDraw, type: cb.draw }
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

    /** @noSelf */
    public static onDraw(): void {
        const clones = objManager.minions.enemies.list;
        for (const clone of clones) {
            if (clone.asAIBase.isDead || clone.asAIBase.level != 0 || clone.asAIBase.isPet || !clone.asAttackableUnit.owner) continue;
            const pos = clone.asAIBase.bonePosition("head");
            graphics.drawTextStroke("** CLONE **", CloneTracker.menu.getByKey("textSize").value, pos, CloneTracker.menu.getByKey("textColor").value);
            graphics.drawCircleRainbow(clone.position, 100, 1, 1);
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