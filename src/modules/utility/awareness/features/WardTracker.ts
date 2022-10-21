import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { MessageUtils } from "../../../../utils/Message";
import { Names } from "../../../../utils/Names";
export interface WardDTO {
    networkId: number;
    position: Vector3;
    wardType: string;
    range: number;
    ownerId: number;
    expireTime: number;
}

/** @customConstructor Ward */
export class Ward {

    public networkId: number;
    public position: Vector3;
    public wardType: string;
    public range: number;
    public ownerId: number;
    public expireTime: number;

    constructor({ networkId, position, wardType, range, ownerId, expireTime}: WardDTO) {
        this.networkId = networkId;
        this.position = position;
        this.wardType = wardType;
        this.range = range;
        this.ownerId = ownerId;
        this.expireTime = expireTime;
    }
}


class WardTracker {

    /** @noSelf */
    public static wardNames = [
        { name: "BlueTrinket", type: "Blue", range: 550 },
        { name: "JammerDevice", type: "Red", range: 900},
        { name: "PerksZombieWard", type: "Yellow", range: 900},
        { name: "SightWard", type: "Yellow", range: 900}, // not sure if this is correct
        { name: "VisionWard", type: "Blue", range: 550}, // not sure if this is correct
        { name: "YellowTrinket", type: "Yellow", range: 900},
        { name: "YellowTrinketUpgrade", type: "Yellow", range: 900},
    ]

    /** @noSelf */
    public static currentCallbacks = [
        { function: WardTracker.onDraw, type: ExtraCallbackLib.SLOW_UPDATE },
        { function: WardTracker.onCreateObject, type: cb.create},
        { function: WardTracker.onDeleteObject, type: cb.delete},
        //{ function: WardTracker.onProcessSpell, type: cb.processSpell},
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of WardTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        WardTracker.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static wardList = new Array<Ward>();

    /** @noSelf */
    private static callbackColor(menuElementObj: MenuElement, value: boolean) {
        const rainbowValue = WardTracker.menu.getByKey("rainbow").value;
        const changeValue = !rainbowValue;
        WardTracker.menu.getByKey("circleColor").hide(changeValue);
        WardTracker.menu.getByKey("textColor").hide(changeValue);
    }

    // Work on it later, need to find a way to get the owner of the ward and debug it.
    // /** @noSelf */
    // public static onProcessSpell(sender : AIBaseClient, castinfo : SpellCastInfo) {
    //     if (!sender || !castinfo) return;
    //     if (!sender.isHero || !sender.isEnemy) return;
    //     if (!WardTracker.isValidWard(castinfo.name)) return;

    //     const ward = new Ward({
    //         networkId: sender.networkId, //
    //         position: castinfo.startPosition,
    //         wardType: Names.wardNames.find(ward => ward.name == castinfo.name)?.type as string,
    //         ownerId: sender.networkId, // maybe using buff owner
    //         expireTime: 0 // TODO: Calculate expire time
    //     });

    // }

    /** @noSelf */
    public static getWardObject(objectName: string) {
        return WardTracker.wardNames.find(ward => ward.name == objectName);
    }

    /** @noSelf */
    public static onCreateObject(object : GameObject) {
        if (!object || !object.isValid) return;
        const wardObject = WardTracker.getWardObject(object.name);
        if (wardObject == undefined) return;
        let expireTime = 0;
        const wardBuff = object.asMinion.findBuff("sharedwardbuff");
        if (wardBuff.valid) expireTime = wardBuff.remainingTime;
        const ward = new Ward({
            networkId: object.networkId,
            position: object.position,
            wardType: wardObject.type,
            range: wardObject.range,
            ownerId: object.asMinion.owner.networkId,
            expireTime: expireTime // TODO: Calculate expire time
        });
        WardTracker.wardList.push(ward);
    }

    /** @noSelf */
    public static onDeleteObject(object : GameObject) {
        if (!object || !object.isValid) return;
        const wardObject = WardTracker.getWardObject(object.name);
        if (wardObject == undefined) return;
        // if object.networkId is in wardList, remove it
        const index = WardTracker.wardList.findIndex(ward => ward.networkId == object.networkId);
        if (index != -1) {
            WardTracker.wardList.splice(index, 1);
        }
    }

    /** @noSelf */
    public static onDraw() {
        if (WardTracker.wardList.length == 0) return;
        const rainbowValue = WardTracker.menu.getByKey("rainbow").value;
        const circleColor = WardTracker.menu.getByKey("circleColor").value;
        const textColor = WardTracker.menu.getByKey("textColor").value;

        for (const ward of WardTracker.wardList) {
            const radius = WardTracker.wardNames.find(wardName => wardName.name == ward.wardType)?.range as number;
            graphics.drawCircle(ward.position, radius, 2, circleColor);
            graphics.drawText(ward.wardType, 20, ward.position, textColor);
        }
    }

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        WardTracker.menu = menu.header("WardTracker", "Ward Tracker");
        const status = WardTracker.menu.boolean("status", "Enabled", false, WardTracker.callbackMenu);
        status.tooltip("Track enemy wards and show their position on the map");
        WardTracker.menu.boolean("text", "Show Text", true);
        WardTracker.menu.spacer("spacer0", "Color");
        WardTracker.menu.boolean("rainbow", "Rainbow Color", true, WardTracker.callbackColor);
        WardTracker.menu.color("circleColor", "Circle Color", graphics.rgba(255, 255, 255, 255));
        WardTracker.menu.color("textColor", "Text Color", graphics.rgba(255, 255, 255, 255));

        for (const minion of objManager.minions.enemies.list) {
            const wardObject = WardTracker.getWardObject(minion.name);
            if (wardObject == undefined) continue;
            const ward = new Ward({
                networkId: minion.networkId,
                position: minion.position,
                wardType: wardObject.type,
                range: wardObject.range,
                ownerId: minion.asMinion.owner.networkId,
                expireTime: 0 // TODO: Calculate expire time
            });
            WardTracker.wardList.push(ward);
        }

        WardTracker.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        WardTracker.updateCallbacks(false);
        menu.delete("WardTracker");
    }

}

export { WardTracker };