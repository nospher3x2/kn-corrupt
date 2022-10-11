declare class fs {
    scriptPath: string;
    configPath: string;

    /**
     * 
     * @param directoryPath 
     * @return {boolean} - Whether the folder creation was successful.
     */
    createFolder( directoryPath: string ): boolean
    
    /**
     * 
     * @param directoryPath 
     * @param extension 
     * @returns {LuaTable} - Table of all files in a directory containing an extension.
     */
    getFiles( directoryPath: string, extension: string ): LuaTable
}

declare global {
    const fs : fs;
}

export {};