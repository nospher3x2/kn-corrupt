class Activator {

    private static modules = [
    ]

    public load = (menu: Menu) => {
        const activatorMenu = menu.header("activator", "Activator");

    }
    
    public unload = (menu: Menu) => {
        menu.delete("activator");   
    }

}

export { Activator  };