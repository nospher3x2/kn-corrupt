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
     * @returns {MenuElement} - Element instance
     */
    boolean(
        key: string,
        displayName: string,
        defaultValue: boolean,
        callback?: /** @noSelf */ ( /** @noSelf */ (menuElementObj: MenuElement, value: boolean) => void)
    ): MenuElement

    /**
     * 
     * @param key 
     * @param displayName 
     * @param callback - Called when button is pressed
     */
    button(
        key: string,
        displayName: string,
        callback?: ((menuElementObj: MenuElement) => void)
    ): MenuElement

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
        callback?: ((menuElementObj: MenuElement, value: number) => void)
    ): MenuElement


    sliderDecimal(
        key: string,
        displayName: string,
        defaultValue: number,
        minValue: number,
        maxValue: number,
        step: number,
        callback?: | ((menuElementObj: MenuElement, value: number) => void)
    ): MenuElement
    keybind(
        key: string,
        displayName: string,
        vKey: number | string,
        defaultValue: boolean,
        isToggle: boolean,
        callback?: | ((menuElementObj: MenuElement, value: boolean) => void)
    ): MenuElement
    list(
        key: string,
        displayName: string,
        items: string[],
        defaultValue: number,
        callback?: ((menuElementObj: MenuElement, value: number) => void)
    ): MenuElement
    color(
        key: string,
        displayName: string,
        defaultValue: number,
        callback?: ((menuElementObj: MenuElement, value: number) => void)
    ): MenuElement
    get(key: string): MenuElement
    getByKey(key: string): MenuElement;
    spacer(key: string, displayName: string): MenuElement
    hide(value: boolean): void
    isopen(): boolean
    isMainMenuOpen(): boolean
}
