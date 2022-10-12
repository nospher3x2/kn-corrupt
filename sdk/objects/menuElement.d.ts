declare class MenuElement {
    value: any;
    get(): any
    set(value: any): any
    tooltip(value: string): void
    /**
     * 
     * @param value - Hides if true, shows if false
     */
    hide(value: boolean): void
}
