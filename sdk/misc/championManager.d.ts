declare class championManager {
    champions: champion[];
    getChampion( championName: string ): champion
}

declare global {
    const championManager : championManager; 
}

export { };