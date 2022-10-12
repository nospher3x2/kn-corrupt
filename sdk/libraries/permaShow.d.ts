
declare class Permashow {
    /** @noSelf **/
    create(key: string, displayName: string, position: Vector2): typeof permaShowWindow
    /** @noSelf **/
    delete(key: string): void
}