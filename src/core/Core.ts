import { KNChampion } from "../modules/champion/KNChampion"
import { KNUtility } from "../modules/utility/KNUtility";
import { MessageUtils } from "../utils/Message";
import ExtraCallbackLib from "./libs/ExtraCallbackLib";
import NotificationLib from "./libs/NotificationLib";

const championModuleHandler = new KNChampion();
const utilityModuleHandler = new KNUtility();

class Core {

    public static VERSION = "1.0.0";
    public static LAST_UPDATE = "10.11.2022";

    public static load = () => {
        ExtraCallbackLib.load();
        NotificationLib.load()

        const main = menu.create("kn", "[KN] Loader");

        main.spacer("separator1", "[KN] Core ")

        const utilityStatus = main.boolean("utility_status", "Utility", true, Core.loadUtilityModule);
        utilityStatus.tooltip("Enable/Disable Utility Module");
        const championStatus = main.boolean("champion_status", "Champion", true, Core.loadChampionModule);
        championStatus.tooltip("Enable/Disable Champion Module");
        main.spacer("separator_blank", " ");
        main.spacer("authors", `© ${Core.VERSION} - Nospher & Karasu`);
        main.spacer("update", `Last Update: ${Core.LAST_UPDATE}`);

        MessageUtils.send("Core Loaded", "#ffffff", true, false);
        if (utilityStatus.value) utilityModuleHandler.load();
        if (championStatus.value) championModuleHandler.load();
    }

    public static unload = () => {
        MessageUtils.send("Core Unloaded.", "#de1010", true, false);
        utilityModuleHandler.unload();
        championModuleHandler.unload();
        menu.delete("kn")
    }

    /** @noSelf */
    private static loadUtilityModule(menuElementObj: MenuElement, value: boolean) {
        value ? utilityModuleHandler.load() : utilityModuleHandler.unload();
    }

    /** @noSelf */
    private static loadChampionModule(menuElementObj: MenuElement, value: boolean) {
        value ? championModuleHandler.load() : championModuleHandler.unload();
    }

}

export default Core;    