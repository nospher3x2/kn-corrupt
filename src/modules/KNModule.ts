export interface IModule {
    name: string;
    type: 'CHAMPION' | 'UTILITY' | 'CORE';
}

abstract class KNModule {

    public static VERSION = "1.0.0";
    public static LAST_UPDATE = "10.11.2022";
    
    private readonly module: IModule;

    constructor(module: IModule) {
        this.module = module;
    }

    public abstract load(): void;
    public abstract unload(): void;

}

export default KNModule;