import ExtraCallbackLib from "../../../../core/libs/ExtraCallbackLib";

class ToxicChat {

    /** @noSelf */
    public static currentCallbacks = [
        { function: ToxicChat.slowUpdate, type: ExtraCallbackLib.SLOW_UPDATE },
    ]

    /** @noSelf */
    public static updateCallbacks(status: boolean) {
        for (const callback of ToxicChat.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        ToxicChat.updateCallbacks(value);
    }

    // Variables
    private static menu: Menu;
    private static oldKda : HeroStats;
    private static words = {
        "BR": ["putao", "horrivel", "tilta ai", "pretão", "gas ta chegando judeu", "tição", "preto", "flanela de mecanico", "pretinho", "negroide", "tu some no escuro mlk", "judeu", "saci", "tizil", "picole de asfalto"],
        "EN": ["XD", "ez", "GAP", "Hardstuck", "kys", "dog", "pet alert", "n1g3érs", "FUCKING KYS", "FKN NIGGERS", "GYPSIES JUST DIE PLEASE", "KYS NIGGA"],
        "TR": ["orospu cocugu", "anani sikeyim", "mal", "sus la bi", "aptal", "oldur kendini", "yaz?k","yok cok kotusunuz", "ez", "kys", "dog?", "k�le",    ],
        "DE": [],
        "CN": [],
        "CHAT_EMOTES": ["?", "XD?", "X", "/", "S", "D", "P",],
        "GAME_EMOTES": ["/taunt", "/masterybadge", "/laugh", "/joke", "/dance"],
        "EMOJI": ["Top", "Right", "Bottom", "Left", "Middle"],
    }

    /** @noSelf */
    public static listUpdateMenu(menu: MenuElement, value: number) {
        // only random until SDK add way for replacing menu.list items.
        //ToxicChat.menu.getByKey("selectedWord").set(Object.keys(ToxicChat.words)[value] as any)
    }

    /** @noSelf */
    public static slowUpdate() {
        // if new_kda > old_kda send chat message
        const newKda = player.asHero.stats;
        if (newKda.kills <= ToxicChat.oldKda.kills || newKda.assists <= ToxicChat.oldKda.assists) return;

        let message = null
        if (ToxicChat.menu.getByKey("random").value) {
            const selectedList = ToxicChat.menu.getByKey("selectedList").value;
            const words = Object.keys(ToxicChat.words)[selectedList.value] as any;
            // não sei se funciona Xd
            message = words[Math.floor(Math.random() * words.length)];
        }
        if (message) {
            chat.sendChat(message);
            ToxicChat.oldKda = newKda;
        }
    }


    // Load Utility functions and set menu/adding callbacks
    public static load = (menu: Menu) => {
        ToxicChat.menu = menu.header("ToxicChat", "Toxic Chat");
        const status = ToxicChat.menu.boolean("status", "Enabled", false, ToxicChat.callbackMenu);
        status.tooltip("100% will get u a ban take care :D.");
        const selectedList = ToxicChat.menu.list("selectedList", "Word List", Object.keys(ToxicChat.words), 0, ToxicChat.listUpdateMenu);
        // only random until SDK add way for replacing menu.list items.
        //ToxicChat.menu.list("selectedWord", "Word", Object.keys(ToxicChat.words)[selectedList.value] as any, 0);
        ToxicChat.menu.boolean("random", "Random", false);
        ToxicChat.menu.boolean("combo", "Only when Combo", false)


        ToxicChat.oldKda = player.asHero.stats;
        ToxicChat.updateCallbacks(status.value);
    }

    // Unload Utility functions and delete menu/callbacks
    public static unload = (menu: Menu) => {
        ToxicChat.updateCallbacks(false);
        menu.delete("ToxicChat");
    }

}

export { ToxicChat };