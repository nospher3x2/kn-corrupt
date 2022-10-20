import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { Coords } from "../../../../utils/Coordinates";
import { Items } from "../../../../utils/Items";

class WardSpots {

    /** @noSelf */
    public static currentCallbacks = [
        { function: WardSpots.onDraw, type: cb.draw },
        { function: WardSpots.slowUpdate, type: ExtraCallbackLib.SLOW_UPDATE },
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        if (game.mapID != MapId.SummonersRift) return; // check if we are on SR, can't buy trinket on other maps
        for (const callback of WardSpots.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        WardSpots.updateCallbacks(value);
    }

    /** @noSelf */
    public static getNearestSpot() {
        const wardList = Coords.wardCords;
        // get nearest standPos from wardList
        const nearestSpot = wardList.reduce((prev, curr) => {
            return (player.distance(prev.standPos) < player.distance(curr.standPos) ? prev : curr);
        });
        return nearestSpot;
    }

    /** @noSelf */
    public static checkDistance() {
        const limitDistance = WardSpots.menu.getByKey("distance").value;
        switch (WardSpots.menu.getByKey("distanceType").value) {
            case 0: // player
                if (player.distance(WardSpots.getNearestSpot().standPos) > limitDistance)
                    return true;
                break;
            case 1: // cursor
                if (player.distance(game.cursorPos) > limitDistance)
                    return true;
                break;
            case 2: // screen
                if (player.distance(game.cameraPos) > limitDistance)
                    return true;
                break;
        }
        
        return false;
    }

    // Variables
    private static menu: Menu;

    /** @noSelf */
    public static onDraw() {
        if (WardSpots.checkDistance()) return;
        const nearestSpot = WardSpots.getNearestSpot();
        const wardColor = WardSpots.menu.getByKey("wardPosColor").value;
        const standColor = WardSpots.menu.getByKey("playerPosColor").value;
        const arrowColor = WardSpots.menu.getByKey("arrowColor").value;

        // draw ward pos
        graphics.drawCircle(nearestSpot.wardPos, 15, 1, wardColor);
        // draw stand pos
        graphics.drawCircle(nearestSpot.standPos, 40, 2, standColor);
        // draw arrow
        graphics.drawLine(nearestSpot.wardPos, nearestSpot.standPos, 2, arrowColor);
    }

    /** @noSelf */
    public static slowUpdate() {
        if (WardSpots.checkDistance()) return;
        const keyStatus = WardSpots.menu.getByKey("useKey");
        if (keyStatus.value) {
            const nearestSpot = WardSpots.getNearestSpot();
            if (player.distance(nearestSpot.standPos) > 10) {
                player.move(nearestSpot.standPos, true);
            }
            else {
                // reduce this logic later...
                if (WardSpots.menu.getByKey("support").value) {
                    Items.supportItems.forEach((item) => {
                        if (player.hasItem(item.id)) {
                            player.castSpell(player.getItemSpellSlot(item.id), nearestSpot.wardPos);
                            return;
                        }
                    });
                }
                Items.wardItems.forEach((item) => {
                    if (player.hasItem(item.id)) {
                        if (item.name == "Control_Ward" && !WardSpots.menu.getByKey("pinkeye").value) return;
                        player.castSpell(player.getItemSpellSlot(item.id), nearestSpot.wardPos);
                        return;
                    }
                });
            }
        }
    }


    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        WardSpots.menu = menu.header("WardSpots", "Ward Spots");
        const status = WardSpots.menu.boolean("status", "Enabled", true, WardSpots.callbackMenu);
        status.tooltip("Shows trick wards spots on the map.");

        WardSpots.menu.keybind("useKey", "Key", "N", false, false)
            .tooltip("Click to go to next ward spot under the cursor. Ward Priority: (SupportItem > Yellow > Pink/Control).");
        WardSpots.menu.boolean("support", "Support Items", false)
            .tooltip("Will use support items to ward before using yellow trinkets.")
        WardSpots.menu.boolean("pinkeye", "Pink/Control", true)
            .tooltip("Will use Pink/Control wards if don't have any other.");

        WardSpots.menu.spacer("spacer0", "Drawings");

        WardSpots.menu.boolean("showArrow", "Draw Arrow", true)
            .tooltip("Shows the direction of the ward spots.");
        WardSpots.menu.list("distanceType", "Distance Factor", ["Player", "MousePos", "Screen"], 0);
        WardSpots.menu.slider("distance", "Max Distance", 600, 0, 3500, 1)
            .tooltip("Minimum distance (in units) from the element limit which ward spots will be drawn");
        WardSpots.menu.boolean("animation", "Animations", true);

        WardSpots.menu.spacer("spacer1", "Color");

        WardSpots.menu.color("arrowColor", "Arrow Color", graphics.rgba(255, 255, 255, 255))
        WardSpots.menu.color("playerPosColor", "Player position", graphics.rgba(0, 0, 255, 255))
        WardSpots.menu.color("wardPosColor", "Ward Positions", graphics.rgba(255, 255, 255, 255))

        WardSpots.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        WardSpots.updateCallbacks(false);
        menu.delete("WardSpots");
    }

}

export { WardSpots };