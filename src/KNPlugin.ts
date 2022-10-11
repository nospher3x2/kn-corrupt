import { ChampionModuleHandler } from "./handler/ChampionModuleHandler"
import { UtilityModuleHandler } from "./handler/UtilityModuleHandler";

const championModuleHandler = new ChampionModuleHandler();
const utilityModuleHandler = new UtilityModuleHandler();

class KNPlugin {

    private main!: Menu;

    public load = () => {
        chat.sendChat("fwadwfadas");
        this.main = menu.create("knaio", "KN AIO");
        const utility = this.main.header("utility", "Utility");
        const champion = this.main.header("champion", "AIO");

        const utilityStatus = utility.boolean("status", "Utility Enabled", true, this.loadUtilityModule);
        if (utilityStatus.value) utilityModuleHandler.load(utility);

        const championStatus = champion.boolean("status", `${player.skinName} Enabled`, true, this.loadChampionModule);
        if (championStatus.value) championModuleHandler.load(champion);
    }

    public unload = () => {
        menu.delete("knaio")
    }

    /** @noSelf */
    private loadUtilityModule(menuElementObj: menuElement, value: boolean) {
        this.main.boolean("xd", "xddd", false);
        // return value ? utilityModuleHandler.load(main) : utilityModuleHandler.unload(main);
    }

    /** @noSelf */
    private loadChampionModule(menuElementObj: menuElement, value: boolean) {
        const main = (menu as any).champion as Menu;
        return value ? championModuleHandler.load(main) : championModuleHandler.unload(main);
    }

}

export default KNPlugin;    