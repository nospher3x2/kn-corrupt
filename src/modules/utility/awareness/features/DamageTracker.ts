import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { MessageUtils } from "../../../../utils/Message";

class DamageTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: DamageTracker.onDraw, type: cb.draw },
        { function: DamageTracker.slowUpdate, type: ExtraCallbackLib.SLOW_UPDATE },
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        MessageUtils.send("Updating callbacks");
        MessageUtils.send(status ? "true" : "false");
        for (const callback of DamageTracker.currentCallbacks) {
            if (status) {
                MessageUtils.send(`Adding callback ${callback.type} to ${callback.function}`);
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        DamageTracker.updateCallbacks(value);
        for (const [networkId] of DamageTracker.cache) {
            DamageTracker.cache.delete(networkId);
        }
    }

    /** @noSelf */
    private static callbackPosition(menuElementObj: MenuElement, value: number) {
        const shouldShow = value != 3 // 3 is custom
        DamageTracker.menu.getByKey("x").hide(shouldShow);
        DamageTracker.menu.getByKey("y").hide(shouldShow);
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

            const position = object.asAIBase.healthBarPosition;
            let text = "Remaining AA: " + (damage + 1).toString();
            if (damage <= 0) text = "KILLABLE!";
            const fontSize = DamageTracker.menu.getByKey("textSize").value
            const textSize = graphics.textSize(text, fontSize);
            let pos = new Vector2(0, 0);

            switch (DamageTracker.menu.getByKey("position").value) {
                case 0:
                    graphics.drawCircle2D(position, 1, 1, graphics.rgba(255, 255, 255, 255));
                    pos = new Vector2(position.x - textSize.x / 2, position.y - textSize.y - 42);
                    break;
                case 1:
                    pos = new Vector2(position.x - textSize.x / 2 - 10, position.y - textSize.y + 20);
                    break;
                case 2:
                    pos = new Vector2(position.x - textSize.x - 75, position.y - textSize.y - 8);
                    break;
                case 3:
                    const xValue = DamageTracker.menu.getByKey("x").value;
                    const yValue = DamageTracker.menu.getByKey("y").value;
                    pos = new Vector2(position.x + xValue, position.y + yValue);
                    break;
            }
            const color = DamageTracker.menu.getByKey("textColor").value;
            graphics.drawText2D(text, fontSize, pos, color);
        }
    }

    /** @noSelf */
    public static slowUpdate(): void {
        MessageUtils.send("Game Update Callback called.");
        const heroesList = objManager.heroes.enemies.list;
        for (const hero of heroesList) {
            if (!hero.asAIBase.isOnScreen) {
                MessageUtils.send("Not on screen");
                continue;
            }
            if (hero.asAIBase.isDead) {
                MessageUtils.send("Dead");
                continue;
            }
            
            if (hero.asAIBase.isInvulnerable) {
                MessageUtils.send("Invulnerable");
                continue;
            }

            if (!hero.asAIBase.isOnScreen || hero.asAIBase.isDead || hero.asAIBase.isInvulnerable) continue;

            let damage = damageLib.autoAttack(player, hero.asAIBase);
            damage = damage <= 0 ? 0 : damage;
            DamageTracker.cache.set(hero.asAIBase.networkId, Math.floor(hero.asAIBase.health / damage));
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        DamageTracker.menu = menu.header("DamageTracker", "Damage Tracker");
        const status = DamageTracker.menu.boolean("status", "Enabled", true, DamageTracker.callbackMenu);
        const list = DamageTracker.menu.list("position", "Position", ["Top", "Bottom", "Middle", "Custom"], 0, DamageTracker.callbackPosition);
        status.tooltip("Tracks amount of AA for killing enemy.");
        DamageTracker.menu.color("textColor", "Text Color", graphics.argb(255, 255, 255, 255));
        DamageTracker.menu.slider("textSize", "Text Size", 20, 0, 100, 1).hide(true);
        DamageTracker.menu.slider("x", "X", 10, -1000, 1000, 1).hide(true);
        DamageTracker.menu.slider("y", "Y", 30, -1000, 1000, 1).hide(true);

        DamageTracker.callbackPosition(list, list.value);
        DamageTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        DamageTracker.updateCallbacks(false);
        menu.delete("DamageTracker");
    }

}

export { DamageTracker };