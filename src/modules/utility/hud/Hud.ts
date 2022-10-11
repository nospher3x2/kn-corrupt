class Hud {

    private static modules = [
    ]

    public load = (menu: Menu) => {
        const hudMenu = menu.header("hud", "Hud");

    }
    
    public unload = (menu: Menu) => {
        menu.delete("hud");   
    }

}

export { Hud  };