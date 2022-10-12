import { round } from "../../../../utils/Round";

class StasisTracker {

    /** @noSelf */
    // { function: StasisTracker.gameUpdate, type: cb.gameUpdate },
    // { function: StasisTracker.onBuff, type: cb.buff },
    public static currentCallbacks = [
        { function: StasisTracker.gameUpdate, type: cb.gameUpdate },
        { function: StasisTracker.onBuff, type: cb.buff },
        { function: StasisTracker.onDraw, type: cb.drawHUD }
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of StasisTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        StasisTracker.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static stasisCache = new Map<number, number>();
    private static buffList = ["ChronoRevive", "BardRStasis", "ZhonyasRingShield"];

    /** @noSelf */
    public static onBuff(sender: AIBaseClient, buff: Buff, gain: boolean): void {
        print(buff.name);
        if (gain && StasisTracker.buffList.includes(buff.name)) {
            StasisTracker.stasisCache.set(sender.networkId, buff.endTime);
        }
    }

    /** @noSelf */
    public static onDraw(): void {
        for (const [networkId, endTime] of StasisTracker.stasisCache) {
            if (endTime > game.time) {
                const hero = objManager.getNetworkObject(networkId) as AIHeroClient;
                const time = endTime - game.time;
                graphics.drawText(round(time, 2).toString(), 30, hero.position, graphics.rgba(255, 255, 255, 255));
                graphics.drawCircleRainbow(hero.pos, 100, 1, 5);
            } else {
                StasisTracker.stasisCache.delete(networkId);
            }
        }
    }
    
    /** @noSelf */
    public static gameUpdate(): void {
    }
    
    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        StasisTracker.menu = menu.header("stasisTracker", "Stasis Tracker");
        const status = StasisTracker.menu.boolean("status", "Enabled", true, StasisTracker.callbackMenu);
        status.tooltip("Tracks enemy stasis (Zhonyas, StopWatch, Revive) duration.");

        StasisTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks

    public static unload = (menu: Menu) => {
        StasisTracker.updateCallbacks(false);
        menu.delete("stasisTracker");
    }

}

export { StasisTracker };