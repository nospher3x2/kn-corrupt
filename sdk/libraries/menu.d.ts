
declare class Menu {
    
    /**
     * 
     * @param key 
     * @param displayName 
     * @returns {Menu} - The menu instance
     * @noSelf
     */
    create(key: string, displayName: string): Menu
    
    /** @noSelf **/
    delete(key: string): void

    /**
     * 
     * @param key 
     * @param displayName 
     * @returns {Menu} - The menu instance
     */
    header(key: string, displayName: string): Menu

    hide(value: boolean): void

    /**
     * 
     * @param key 
     * @param displayName 
     * @param defaultValue 
     * @param callback - Called when value is changed
     * @returns {menuElement} - Element instance
     */
    boolean(
        key: string,
        displayName: string,
        defaultValue: boolean,
        callback?: /** @noSelf */ ( /** @noSelf */ (menuElementObj: menuElement, value: boolean) => void)
    ): menuElement

    /**
     * 
     * @param key 
     * @param displayName 
     * @param callback - Called when button is pressed
     */
    button(
        key: string,
        displayName: string,
        callback?: ((menuElementObj: menuElement) => void)
    ): menuElement

    /**
     * 
     * @param key 
     * @param displayName 
     * @param defaultValue 
     * @param minValue 
     * @param maxValue 
     * @param step 
     * @param callback - Called when value is changed
     */
    slider(
        key: string,
        displayName: string,
        defaultValue: number,
        minValue: number,
        maxValue: number,
        step: number,
        callback?: ((menuElementObj: menuElement, value: number) => void)
    ): menuElement


    sliderDecimal(
        key: string,
        displayName: string,
        defaultValue: number,
        minValue: number,
        maxValue: number,
        step: number,
        callback?: | ((menuElementObj: menuElement, value: number) => void)
    ): menuElement
    keybind(
        key: string,
        displayName: string,
        vKey: number | string,
        defaultValue: boolean,
        isToggle: boolean,
        callback?: | ((menuElementObj: menuElement, value: boolean) => void)
    ): menuElement
    list(
        key: string,
        displayName: string,
        items: string[],
        defaultValue: number,
        callback?: ((menuElementObj: menuElement, value: number) => void)
    ): menuElement
    color(
        key: string,
        displayName: string,
        defaultValue: number,
        callback?: ((menuElementObj: menuElement, value: number) => void)
    ): menuElement
    get(key: string): menuElement
    spacer(key: string, displayName: string): menuElement
    hide( value: boolean ) : void
    isopen() : boolean
    isMainMenuOpen(): boolean
}
