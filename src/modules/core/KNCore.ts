import { ChampionModuleHandler } from "../champion/KNChampion"
import { UtilityModuleHandler } from "../utility/KNUtility";
import { MessageUtils } from "../../utils/message";
import KNModule from "../KNModule";

const championModuleHandler = new ChampionModuleHandler();
const utilityModuleHandler = new UtilityModuleHandler();

class KNCore extends KNModule {

    constructor() {
        super({
            name: 'Core',
            type: 'CORE'
        })
    }
    
    public load = () => {
        MessageUtils.send("Core Loaded", "#ffffff", true, false); 
        const main = menu.create("kn", "[KN] Loader");
        main.spacer("separator1", "[KN] Core ")
        
        const utilityStatus = main.boolean("utility_status", "Utility", true, this.loadUtilityModule);
        utilityStatus.tooltip("Enable/Disable Utility Module");
        const championStatus = main.boolean("champion_status", "Champion", true, this.loadChampionModule); 
        championStatus.tooltip("Enable/Disable Champion Module");
        main.spacer("separator_blank", " ");
        main.spacer("authors", `© ${KNModule.VERSION} - Nospher & Karasu`);
        main.spacer("update", `Last Update: ${KNModule.LAST_UPDATE}`);
        
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