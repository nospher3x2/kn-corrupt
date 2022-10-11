class Insanity {

    private static modules = [
    ]

    public load = (menu: Menu) => {
        const insanityMenu = menu.header("insanity", "Insanity");

    }
    
    public unload = (menu: Menu) => {
        menu.delete("insanity");
    }

}

export { Insanity  };