import { IndexKind } from "typescript";

class WardGrid {

    public static CacheNavMesh = new LuaMap<number, navCell>();

    public static settings: {
        status: menuElement;
    };

    /** @noSelf */
    public static callbackMenu(menuElementObj: menuElement, value: boolean) {
        if(value) {
            cb.add(cb.draw, WardGrid.onDraw);
        } else {
            cb.remove(cb.draw, WardGrid.onDraw);
        }
    }

    /** @noSelf */
    public static onDraw() {

        const cursorPos = game.;
        const cellPos = navMesh.getCell(cursorPos);

        if (!navMesh.isWall(cursorPos)) return;

        //  const mousePos = game.cursorPos;
        //  const nav = navMesh.getCell(mousePos);
        //  if(nav && nav.collisionFlags) {
        // }

    }

    public static load = (menu: Menu) => {
        const pathMenu = menu.header("wardGrid", "Ward Grid");
        const status = pathMenu.boolean("status", "Enabled", true, WardGrid.callbackMenu);

        for(let i = 0; i < navMesh.maxCells; i++) {
            const cell = navMesh.getCell(i);    
            WardGrid.CacheNavMesh.set(i, cell);
        }

        WardGrid.settings = {
            status: status
        }

        //callbacks
        if (WardGrid.settings.status.value) {
            // cb.add(cb.newPath, WardGrid.onNewPath);
            cb.add(cb.draw, WardGrid.onDraw);
        }
    }

    public static unload = (menu: Menu) => {
        cb.remove(cb.draw, WardGrid.onDraw);
        // cb.remove(cb.newPath, WardGrid.onNewPath);
        menu.delete("wardGrid");
    }

}

export { WardGrid };