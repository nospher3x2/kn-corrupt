import { MessageUtils } from "../../utils/message";
import KNModule from "../KNModule";

class KNUtility extends KNModule {

    constructor() {
        super({
            name: 'Utility',
            type: 'UTILITY'
        })
    }

    public load = () => {
        MessageUtils.send("Utility Loaded.", "#c7ed3b", true, true);
        const utilityMenu = menu.create("kn_utility", "[KN] Utility");
    }
    
    public unload = () => {
        MessageUtils.send("Utility Unloaded.", "#f0b726", true, true);
        menu.delete("kn_utility");
    }

}

export { KNUtility as UtilityModuleHandler };