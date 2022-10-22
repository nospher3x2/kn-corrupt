import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { MessageUtils } from "../../../../utils/Message";

class OrnnPillar {

    /** @noSelf */
    public static currentCallbacks = [
        { function: OrnnPillar.onDraw, type: cb.draw },
        { function: OrnnPillar.onCreateObject, type: cb.create},
        { function: OrnnPillar.onDeleteObject, type: cb.delete},
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of OrnnPillar.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        OrnnPillar.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static ornnPillarRange = 400;
    private static ornnObject: GameObject | null;

    /** @noSelf */
    private static callbackColor(menuElementObj: MenuElement, value: boolean) {
        MessageUtils.send("[Ornn Pillar] *DEBUG* Color changed", "#FF0000");
        const rainbowValue = OrnnPillar.menu.getByKey("rainbow").value;
        const changeValue = !rainbowValue;
        OrnnPillar.menu.getByKey("circleColor").hide(changeValue);
        OrnnPillar.menu.getByKey("textColor").hide(changeValue);
    }

    /** @noSelf */
    public static isOrnnObject(object : GameObject) {
        return object.name == "OrnnQPillar";
    }

    /** @noSelf */
    public static onCreateObject(object : GameObject) {
        if (OrnnPillar.isOrnnObject(object)) OrnnPillar.ornnObject = object;
    }

    /** @noSelf */
    public static onDeleteObject(object : GameObject) {
        if (OrnnPillar.isOrnnObject(object)) OrnnPillar.ornnObject = null;
    }

    /** @noSelf */
    public static onDraw() {
        if (OrnnPillar.ornnObject == null) return;
        const rainbowValue = OrnnPillar.menu.getByKey("rainbow").value;
        rainbowValue ? graphics.drawCircleRainbow(OrnnPillar.ornnObject.position, OrnnPillar.ornnPillarRange, 2, 5) : graphics.drawCircle(OrnnPillar.ornnObject.position, OrnnPillar.ornnPillarRange, 2, OrnnPillar.menu.getByKey("circleColor").value);
        // change when drawTextRainbow supported.
        graphics.drawText("Ornn Pillar", 20, OrnnPillar.ornnObject.position, OrnnPillar.menu.getByKey("textColor").value);
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        OrnnPillar.menu = menu.header("OrnnPillar", "Ornn Pillar Range");
        const status = OrnnPillar.menu.boolean("status", "Enabled", false, OrnnPillar.callbackMenu);
        status.tooltip("Draws a circle around the Ornn Pillar, where player will get stunned.");
        OrnnPillar.menu.boolean("text", "Show Text", true);
        OrnnPillar.menu.spacer("spacer0", "Color");
        OrnnPillar.menu.boolean("rainbow", "Rainbow Color", true, OrnnPillar.callbackColor);
        OrnnPillar.menu.color("circleColor", "Circle Color", graphics.rgba(255, 255, 255, 255));
        OrnnPillar.menu.color("textColor", "Text Color", graphics.rgba(255, 255, 255, 255));


        OrnnPillar.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        OrnnPillar.updateCallbacks(false);
        menu.delete("OrnnPillar");
    }

}

export { OrnnPillar };