
declare class Graphics {

    public width: number
    public height: number

    /**
     * 
     * @param red 
     * @param green 
     * @param blue 
     * @param alpha 
     * @returns {number} - Color
     */
    rgba(red: number, green: number, blue: number, alpha: number): number

    /**
     * 
     * @param alpha 
     * @param red 
     * @param green 
     * @param blue 
     * @returns {number} - Color
     */
    argb(alpha: number, red: number, green: number, blue: number): number

    /**
     * 
     * @param text
     * @param fontSize
     * @returns {Vector2} - Size
     */
    textSize(text: string, fontSize: number): Vector2

    /** @noSelf **/
    drawCircle(position: Vector3, radius: number, thickness: number, color: number): void
    /** @noSelf **/
    drawCircleRainbow(position: Vector3, radius: number, thickness: number, speed: number): void
    /** @noSelf **/
    drawCircle2D(position: Vector2, radius: number, thickness: number, color: number): void
    /** @noSelf **/
    drawCircleMinimap(position: Vector3, radius: number, thickness: number, color: number): void
    /** @noSelf **/
    drawCircleMinimap2D(position: Vector2, radius: number, thickness: number, color: number): void
    /** @noSelf **/
    drawCircleFilled(position: Vector3, radius: number, color: number): void
    /** @noSelf **/
    drawCircleFilled2D(position: Vector2, radius: number, color: number): void
    /** @noSelf **/
    drawText(text: string, fontSize: number, position: Vector3, color: number): void
    /** @noSelf **/
    drawText2D(text: string, fontSize: number, position: Vector2, color: number): void
    /** @noSelf **/
    drawTextStroke(text: string, fontSize: number, position: Vector3, color: number): void
    /** @noSelf **/
    drawTextStroke2D(text: string, fontSize: number, position: Vector2, color: number): void
    /** @noSelf **/
    drawLine(start: Vector3, end_pos: Vector3, thickness: number, color: number): void
    /** @noSelf **/
    drawLineRainbow(start: Vector3, end_pos: Vector3, thickness: number, speed: number): void
    /** @noSelf **/
    drawLine2D(start: Vector2, end_pos: Vector2, thickness: number, color: number): void
    /** @noSelf **/
    drawRectangle2D(position: Vector2, width: number, height: number, color: number): void
    /** @noSelf **/
    drawTriangle2D(p1: Vector2, p2: Vector2, p3: Vector2, thickness: number, color: number): void
    /** @noSelf **/
    drawTexture(tx: any, position: Vector2, size: Vector2): void
    /** @noSelf **/
    drawTextureUV(tx: any, position: Vector2, size: Vector2, uvMin: Vector2, uvMax: Vector2, color: number): void
    /** @noSelf **/
    createTexture(path: string): any
    /** @noSelf **/
    worldToScreen(worldPosition: Vector3): Vector2
}