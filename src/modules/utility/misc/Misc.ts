class Misc {

    private static modules = [
    ]

    public load = (menu: Menu) => {
        const miscMenu = menu.header("misc", "Miscellaneous");

    }
    
    public unload = (menu: Menu) => {
        menu.delete("misc");   
    }

}

export { Misc  };