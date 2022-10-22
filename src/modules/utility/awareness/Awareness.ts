import { CloneTracker } from "./features/CloneTracker";
import { DamageTracker } from "./features/DamageTracker";
import { OrnnPillar } from "./features/OrnnPillarRange";
import { PathTracker } from "./features/PathTracker";
import { StasisTracker } from "./features/StasisTracker";
import { WardGrid } from "./features/WardGrid";

class Awareness {

    public static main: Menu;

    private static modules = [
        StasisTracker,
        CloneTracker,
        PathTracker,
        OrnnPillar,
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