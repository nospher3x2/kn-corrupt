declare class playerHandle {
    /**
     * Sets the summoners name to the name value.
     * @param unit The summoner you want to set the summoner name on
     * @param name The name you want to set
     */
    setSummonerName(unit: aiBaseClient, name: string): void

    /**
     * Restores the summoner name to the original name
     * @param unit - The summoner you want to change the name on.
     */
    restoreSummonerName(unit: aiBaseClient): void
}
declare global {
    const playerHandle: playerHandle;
}

export {};