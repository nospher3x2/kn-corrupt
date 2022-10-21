import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";

interface Dash {
    networkId: number;
    path: Vector3[];
    expireTime: number;
}

class DashTracker {

    /** @noSelf */
    public static currentCallbacks = [
        { function: DashTracker.onDraw, type: ExtraCallbackLib.SLOW_UPDATE },
        { function: DashTracker.onNewPath, type: cb.newPath },
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of DashTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        DashTracker.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static dashList = new Array<Dash>();

    /** @noSelf */
    private static callbackColor(menuElementObj: MenuElement, value: boolean) {
        const rainbowValue = DashTracker.menu.getByKey("rainbow").value;
        const changeValue = !rainbowValue;
        DashTracker.menu.getByKey("textColor").hide(changeValue);
        DashTracker.menu.getByKey("lineColor").hide(changeValue);
    }

    /** @noSelf */
    private static onNewPath(sender: AIBaseClient, path: Array<Vector3>, isDash: boolean, speed: number) {
        if (!sender.isEnemy || !isDash) return;
        const dash = {
            networkId: sender.networkId,
            path: path,
            expireTime: game.time + ((path[path.length - 1].distance(sender.position) / speed) * 1000),
        };
        DashTracker.dashList.push(dash);
    }

    /** @noSelf */
    public static onDraw() {
        if (DashTracker.dashList.length === 0) return;
        const rainbow = DashTracker.menu.getByKey("rainbow").value;
        const type = DashTracker.menu.getByKey("info").value;
        const lineColor = DashTracker.menu.getByKey("lineColor").value;
        const textColor = DashTracker.menu.getByKey("textColor").value;
        for (const dash of DashTracker.dashList) 
        {
            const startPos = dash.path[0];
            const endPos = dash.path[dash.path.length - 1];
            const object = objManager.getNetworkObject(dash.networkId);
            const icon = object.asAIBase.iconSquare;

            rainbow ? graphics.drawLineRainbow(startPos, endPos, 2, 5) : graphics.drawLine(startPos, endPos, 2, lineColor);
            switch (type) {
                case 0:
                    graphics.drawTexture(icon, graphics.worldToScreen(endPos), new Vector2(50, 50));
                    break;
                case 1:
                    graphics.drawText(object.name, 20, endPos, textColor);
                    break;
                case 2:
                    graphics.drawTexture(icon, graphics.worldToScreen(endPos), new Vector2(50, 50));
                    // aumentar a distancia entre os dois, muito sono pra isso.
                    graphics.drawText(object.name, 20, endPos, textColor);
            }
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        DashTracker.menu = menu.header("DashTracker", "Dash Tracker");
        const status = DashTracker.menu.boolean("status", "Enabled", false, DashTracker.callbackMenu);
        status.tooltip("Draws a arrow to enemy champions that are dashing.");
        DashTracker.menu.list("info", "Draw as", ["Icon", "Text", "Both"], 2);
        DashTracker.menu.spacer("spacer0", "Color");
        DashTracker.menu.boolean("rainbow", "Rainbow Color", true, DashTracker.callbackColor);
        DashTracker.menu.color("textColor", "Text Color", graphics.rgba(255, 255, 255, 255));
        DashTracker.menu.color("lineColor", "Line Color", graphics.rgba(255, 255, 255, 255));

        DashTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        DashTracker.updateCallbacks(false);
        menu.delete("DashTracker");
    }

}

export { DashTracker };