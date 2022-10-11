import KNModule from "../KNModule";

class KNChampion extends KNModule {

    constructor() {
        super({
            name: 'Champion',
            type: 'CHAMPION'
        })
    }

    public load = () => {

    }

    public unload = () => {

    }

}

export { KNChampion as ChampionModuleHandler };