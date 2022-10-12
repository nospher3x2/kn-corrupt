
declare class ManagerTemplate {
    count: number;
    list: LuaTable<number, AIBaseClient>;
    enemies: ManagerTemplateList;
    allies: ManagerTemplateList;
    neutrals: ManagerTemplateList;
}
