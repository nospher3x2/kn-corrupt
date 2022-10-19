import { SpellChat } from "./features/SpellChat";
import { ToxicChat } from "./features/Toxic";
import { UPTrinket } from "./features/UpgradeTrinket";

class Misc {

    public static main: Menu;

    private static modules = [
        UPTrinket,
        ToxicChat,
        SpellChat
    ]

    public load = (menu: Menu) => {
        Misc.main = menu.header("Misc", "Misc");

        for(const module of Misc.modules) {
            module.load(Misc.main);
        }
    }
    
    public unload = (menu: Menu) => {
        menu.delete("Misc");
        for (const module of Misc.modules) {
            module.unload(Misc.main);
        }
    }

}

export { Misc };