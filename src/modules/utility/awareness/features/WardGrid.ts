class WardGrid {

    public static settings: {
        status: MenuElement;
    };

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        if (value) {
            cb.add(cb.gameUpdate, WardGrid.onUpdate);
        } else {
            cb.remove(cb.gameUpdate, WardGrid.onUpdate);
        }
    }

    public static onUpdate() {
    }

    public static load = (menu: Menu) => {
        const pathMenu = menu.header("wardGrid", "Ward Grid");
        const status = pathMenu.boolean("status", "Enabled", true, WardGrid.callbackMenu);

        WardGrid.settings = {
            status: status
        } 

        //callbacks
        if (WardGrid.settings.status.value) {
            cb.add(cb.gameUpdate, WardGrid.onUpdate);
        }
    }

    public static unload = (menu: Menu) => {
        cb.remove(cb.gameUpdate, WardGrid.onUpdate);
        menu.delete("wardGrid");
    }

}

export { WardGrid };