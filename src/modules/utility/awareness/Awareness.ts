import { MessageUtils } from "../../../utils/message";

class Awareness {

    public load = (menu: Menu) => {
        const awarenessMenu = menu.header("awareness", "Awareness");
        awarenessMenu.boolean("status", "Enabled", true);
    }
    
    public unload = (menu: Menu) => {
        menu.delete("awareness");
    }

}

export { Awareness  };