import { KNChampion } from "../champion/KNChampion"
import { KNUtility } from "../utility/KNUtility";
import { MessageUtils } from "../../utils/message";

const championModuleHandler = new KNChampion();
const utilityModuleHandler = new KNUtility();

class KNCore {

    public static VERSION = "1.0.0";
    public static LAST_UPDATE = "10.11.2022";

    public load = () => {
        MessageUtils.send("Core Loaded", "#ffffff", true, false); 
        const main = menu.create("kn", "[KN] Loader");
        main.spacer("separator1", "[KN] Core ")
        
        const utilityStatus = main.boolean("utility_status", "Utility", true, this.loadUtilityModule);
        utilityStatus.tooltip("Enable/Disable Utility Module");
        const championStatus = main.boolean("champion_status", "Champion", true, this.loadChampionModule); 
        championStatus.tooltip("Enable/Disable Champion Module");
        main.spacer("separator_blank", " ");
        main.spacer("authors", `© ${KNCore.VERSION} - Nospher & Karasu`);
        main.spacer("update", `Last Update: ${KNCore.LAST_UPDATE}`);
        
        if(utilityStatus.value) utilityModuleHandler.load();
        if(championStatus.value) championModuleHandler.load();
    }

    public unload = () => {
        MessageUtils.send("Core Unloaded.", "#de1010", true, true);
        utilityModuleHandler.unload();
        championModuleHandler.unload();
        menu.delete("kn")
    }

    /** @noSelf */
    private loadUtilityModule(menuElementObj: menuElement, value: boolean) {
        value ? utilityModuleHandler.load() : utilityModuleHandler.unload();
    }

    /** @noSelf */
    private loadChampionModule(menuElementObj: menuElement, value: boolean) {
        value ? championModuleHandler.load() : championModuleHandler.unload();
    }

}

export default KNCore;    