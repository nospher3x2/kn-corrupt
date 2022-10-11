import { PathTracker } from "./features/PathTracker";
import { WardGrid } from "./features/WardGrid";

class Awareness {

    public static main: Menu;

    private static modules = [
        WardGrid,
        PathTracker
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