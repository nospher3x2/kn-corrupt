import { MessageUtils } from "../../utils/message";
import { Awareness } from "./awareness/Awareness";

class KNUtility {

    public static main: Menu;

    private static modules = [
        new Awareness()
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