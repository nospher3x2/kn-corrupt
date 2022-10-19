import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { Coords } from "../../../../utils/Coordinates";
import { Items } from "../../../../utils/Items";

class UPTrinket {

    /** @noSelf */
    public static currentCallbacks = [
        { function: UPTrinket.slowUpdate, type: ExtraCallbackLib.SLOW_UPDATE },
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        if (game.mapID != MapId.SummonersRift) return; // check if we are on SR, can't buy trinket on other maps
        for (const callback of UPTrinket.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        UPTrinket.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static blacklisted = [
        "Jax",
        "LeeSin",
    ]

    /** @noSelf */
    public static slowUpdate() {
        if (player.distance(Coords.getBaseCoords(player.team)) > 500) return; // check if we are in base

        if (player.getItemSpellSlot(3340) == SpellSlot.Invalid) return; // check if we have yellow trinket

        if (UPTrinket.blacklisted.includes(player.skinName)) return; // check if we are blacklisted

        Items.supportItems.forEach((item) => {
            if (player.hasItem(item.id)) {
                player.buyItem(3364); // oracle lens
                return;
            }
        });

        if (player.level >= 9) {
            player.buyItem(3363); // blue trinket
        }
    }


    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        UPTrinket.menu = menu.header("UPTrinket", "Upgrade Trinket");
        const status = UPTrinket.menu.boolean("status", "Enabled", true, UPTrinket.callbackMenu);
        status.tooltip("Will upgrade your trinket when you have (Level or Support Items). Disabled for Jax and LeeSin.");

        UPTrinket.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        UPTrinket.updateCallbacks(false);
        menu.delete("UPTrinket");
    }

}

export { UPTrinket };