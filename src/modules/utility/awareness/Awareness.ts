import { DamageTracker } from "./features/DamageTracker";
import { PathTracker } from "./features/PathTracker";
import { StasisTracker } from "./features/StasisTracker";
import { WardGrid } from "./features/WardGrid";

class Awareness {

    public static main: Menu;

    private static modules = [
        StasisTracker,
        WardGrid,
        PathTracker,
        DamageTracker
    ]

    public load = (menu: Menu) => {
        Awareness.main = menu.header("awareness", "Awareness");

        for(const module of Awareness.modules) {
            module.load(Awareness.main);
        }
    }
    
    public unload = (menu: Menu) => {
        menu.delete("awareness");
        for (const module of Awareness.modules) {
            module.unload(Awareness.main);
        }
    }

}

export { Awareness  };