import GraphicsLib from "../../../../core/libs/GraphicsLib";
import { round } from "../../../../utils/Round";

interface StasisBuff {
    start: number;
    end: number;
}

class StasisTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: StasisTracker.onBuff, type: cb.buff },
        { function: StasisTracker.onDraw, type: cb.draw }
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
    private static stasisCache = new LuaTable<number, StasisBuff>();
    private static buffList = ["chronorevive", "bardrstasis", "zhonyasringshield"];

    /** @noSelf */
    public static onBuff(sender: AIBaseClient, buff: Buff, gain: boolean): void {
        if (!(gain && sender.isHero)) return;

        const isMe = sender.networkId == player.networkId;

        if (isMe && !StasisTracker.menu.getByKey("shouldTrack.me").value) return;
        if (sender.isEnemy && !StasisTracker.menu.getByKey("shouldTrack.enemy").value) return;
        if ((sender.isAlly && !isMe) && !StasisTracker.menu.getByKey("shouldTrack.ally").value) return;

        if (StasisTracker.buffList.includes(buff.name.toLowerCase())) {
            StasisTracker.stasisCache.set(sender.networkId, { start: buff.startTime, end: buff.endTime });
        }
    }

    /** @noSelf */
    public static onDraw(): void {
        for (const [networkId, { start, end }] of StasisTracker.stasisCache) {
            print(end);
            if (end > game.time) {
                const hero = objManager.getNetworkObject(networkId) as AIHeroClient;
                const time = end - game.time;

                GraphicsLib.semiCircleRainbow(
                    hero.position,
                    80,
                    5,
                    360,
                    (360 * (1 - ((game.time - start) / 2.4)))
                );

                graphics.drawText(round(time, 2).toString(), 30, hero.position, graphics.rgba(255, 255, 255, 255));
            } else {
                StasisTracker.stasisCache.delete(networkId);
            }
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        StasisTracker.menu = menu.header("stasisTracker", "Stasis Tracker");
        const status = StasisTracker.menu.boolean("status", "Enabled", true, StasisTracker.callbackMenu);
        status.tooltip("Tracks enemy stasis (Zhonyas, StopWatch, Revive) duration.");

        const shouldHeader = StasisTracker.menu.header("shouldTrack", "Should Track");
        shouldHeader.boolean("me", "Me", true);
        shouldHeader.boolean("ally", "Ally", false);
        shouldHeader.boolean("enemy", "Enemy", true);

        StasisTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        StasisTracker.updateCallbacks(false);
        menu.delete("stasisTracker");
    }

}

export { StasisTracker };