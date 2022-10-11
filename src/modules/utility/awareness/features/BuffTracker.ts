class BuffTracker {

    public load = (menu: Menu) => {
        const buffMenu = menu.header("buffTracker", "Buff Tracker");

    }
    
    public unload = (menu: Menu) => {
        menu.delete("buffTracker");   
    }

}

export { BuffTracker  };