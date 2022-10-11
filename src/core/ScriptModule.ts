export interface IModule {
    name: string;
    type: 'CHAMPION' | 'UTILITY';
}

abstract class ScriptModule {

    private readonly module: IModule;

    constructor(module: IModule) {
        this.module = module;
    }

    public abstract load(): void;
    public abstract unload(): void;

}

export default ScriptModule;