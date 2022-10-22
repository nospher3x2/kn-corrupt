import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";
import { Names } from "../../../../utils/Names";
import { round } from "../../../../utils/Round";

class SpellChat {

    /** @noSelf */
    public static currentCallbacks = [
        { function: SpellChat.slowUpdate, type: ExtraCallbackLib.SLOW_UPDATE },
        { function: SpellChat.onProcessSpellCast, type: cb.processSpell }
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of SpellChat.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        SpellChat.updateCallbacks(value);
    }

    /** @noSelf */
    public static padTo2Digits(num : number) {
        return num.toString().padStart(2, '0');
    }

    // Variables
    private static menu: Menu;

    private static validSpells = [
        { name: "SummonerDot", shortName: "ig"}, // ignite
        { name: "SummonerFlash", shortName: "f"},
        { name: "SummonerBoost", shortName: "cl"}, // cleanse
        { name: "SummonerHaste", shortName: "g"}, //ghost
        { name: "SummonerHeal", shortName: "h"},
        { name: "SummonerExhaust", shortName: "ex"},
        { name: "S12_SummonerTeleportUpgrade", shortName: "tp"},
        { name: "SummonerTeleport", shortName: "tp"},
        { name: "SummonerBarrier", shortName: "b"},
    ];

    public static longName(name : string) {
        // TODO: find better way to do this.
        return name.replace("S12_SummonerTeleport", "").replace("Summoner", "").replace("Upgrade", "");
    }

    /** @noSelf */
    public static onProcessSpellCast(sender: AIBaseClient, castInfo: SpellCastInfo) {
        if (!sender.isEnemy) return;
        // in the future add support for importants ultimates.
        const slot = castInfo.slot;
        if (![SpellSlot.Summoner1, SpellSlot.Summoner2].includes(slot)) return;
        const spell = SpellChat.validSpells.find((spell) => spell.name === castInfo.name);
        if (!spell) return;

        if (SpellChat.menu.getByKey("ping").value) {
            // current sdk does not support this
        }
        if (SpellChat.menu.getByKey("chat").value) {
            const spellName = SpellChat.menu.getByKey("textOptions.shortSpell").value ? spell.shortName : SpellChat.longName(spell.name);
            const heroName = SpellChat.menu.getByKey("textOptions.shortHero").value ? Names.getShort(sender) : sender.skinHash;
            const message = `${heroName} used ${spellName} ready in ${sender.getSpell(slot).cooldown} seconds`;
            chat.sendChat(message)
        }
    }

    /** @noSelf */
    public static slowUpdate() {
        const keyStatus = SpellChat.menu.getByKey("key")
        if (keyStatus.value) {
            let message = "";
            for (const hero of objManager.heroes.enemies.list) { // TODO: change to enemies
                for (const slot of [SpellSlot.Summoner1, SpellSlot.Summoner2]) {
                    const spellInfo = hero.asAIBase.getSpell(slot);
                    const spell = SpellChat.validSpells.find((spell) => spell.name === spellInfo.name);
                    if (!spell) continue;
                    if (SpellChat.menu.getByKey("textOptions.flash").value && spell.name != "SummonerFlash") continue;
                    const cooldown = spellInfo.cooldown;
                    if (cooldown > 0) {
                        const spellName = SpellChat.menu.getByKey("textOptions.shortSpell").value ? spell.shortName : SpellChat.longName(spell.name);
                        const heroName = SpellChat.menu.getByKey("textOptions.shortHero").value ? Names.getShort(hero.asAIBase) : hero.asAIBase.skinName;
                        const totalSeconds = spellInfo.readyTime;
                        const minutes = Math.floor(totalSeconds / 60);
                        const seconds = round(totalSeconds % 60, 0);
                        const result = `${SpellChat.padTo2Digits(minutes)}:${SpellChat.padTo2Digits(seconds)}`;

                        if (SpellChat.menu.getByKey("textOptions.oneLine").value) {
                            message += ` ${heroName} ${spellName} ${result}`;
                        } else {
                            const m2 = `${heroName} used ${spellName} ready in ${result} seconds`;
                            SpellChat.menu.getByKey("textOptions.fake").value ? chat.showChat(m2) : chat.sendChat(m2);
                        }
                    }
                }
            }
            if (message.length > 0) {
                SpellChat.menu.getByKey("textOptions.fake").value ? chat.showChat(message) : chat.sendChat(message);
            }
            keyStatus.set(false);
        }
    } 

    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        SpellChat.menu = menu.header("SpellChat", "Spell Chat");
        const status = SpellChat.menu.boolean("status", "Enabled", false, SpellChat.callbackMenu);
        status.tooltip("Send spells cooldown in chat.");

        const textOptions = SpellChat.menu.header("textOptions", "Text Options");

        const oneLine = textOptions.boolean("oneLine", "One Line", true);
        oneLine.tooltip("Send spells cooldown in one line. (e.g. Kat f 3:50 Lux h 2:30)");

        const shortSpell = textOptions.boolean("shortSpell", "Spell Short Name", true);
        shortSpell.tooltip("Send short name of the spell. (e.g. f for flash)");

        const shortHero = textOptions.boolean("shortHero", "Hero Short Name", true);
        shortHero.tooltip("Send short name of the hero. (e.g. Kat for Katarina)");

        const flash = textOptions.boolean("flash", "Only Flash", false);
        flash.tooltip("Only send flash spell in chat.");

        textOptions.boolean("fake", "Fake chat", false);

        const imp = textOptions.boolean("imprecise", "Imprecise Values", false);
        imp.tooltip("Use imprecise values for cooldowns. (e.g. 1:40 instead of 1:45)");

        SpellChat.menu.spacer("spacer1", "Automatic");

        SpellChat.menu.boolean("ping", "Ping", false);
        const chat = SpellChat.menu.boolean("chat", "Chat", false);
        chat.tooltip("Can be very spammy/unlegit.");

        SpellChat.menu.spacer("spacer2", "Manual");

        SpellChat.menu.keybind("key", "Keybind", "F3", true, true);
        SpellChat.menu.boolean("pingManual", "Ping Instead ^^", false);
        const clickHud = SpellChat.menu.boolean("hud", "Click Hud", false);
        clickHud.tooltip("Click Hud to send spells cooldown in chat.");

        SpellChat.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        SpellChat.updateCallbacks(false);
        menu.delete("SpellChat");
    }

}

export { SpellChat };