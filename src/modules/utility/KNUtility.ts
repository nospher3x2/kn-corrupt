import { MessageUtils } from "../../utils/Message";
import { Activator } from "./activator/Activator";
import { Awareness } from "./awareness/Awareness";
import { Hud } from "./hud/Hud";
import { Insanity } from "./insanity/Insanity";
import { Misc } from "./misc/Misc";

class KNUtility {

    public static main: Menu;

    private static modules = [
        new Activator(),
        new Awareness(),
        new Hud(),
        new Insanity(),
        new Misc()
    ]

    public load = () => {
        MessageUtils.send("Utility Loaded.", "#c7ed3b", true, true);
        KNUtility.main = menu.create("kn_utility", "[KN] Utility");

        for(const module of KNUtility.modules) {
            module.load(KNUtility.main);
        }
    }
    
    public unload = () => {
        MessageUtils.send("Utility Unloaded.", "#f0b726", true, true);
        menu.delete("kn_utility");

        for(const module of KNUtility.modules) {
            module.unload(KNUtility.main);
        }
    }

}

export { KNUtility  };