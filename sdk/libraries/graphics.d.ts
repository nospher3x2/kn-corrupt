
declare class graphics {
    
    /**
     * 
     * @param red 
     * @param green 
     * @param blue 
     * @param alpha 
     * @returns {number} - Color
     */
    rgba( red: number, green: number, blue: number, alpha: number ): number

    /**
     * 
     * @param alpha 
     * @param red 
     * @param green 
     * @param blue 
     * @returns {number} - Color
     */
    argb( alpha: number, red: number, green: number, blue: number ): number
    
    /**
     * 
     * @param text
     * @param fontSize
     * @returns {vec2} - Size
     */
    textSize( text: string, fontSize: number ): vec2

    /** @noSelf **/
    drawCircle( position: vec3, radius: number, thickness: number, color: number ): void
    /** @noSelf **/
    drawCircleRainbow( position: vec3, radius: number, thickness: number, speed: number ): void
    /** @noSelf **/
    drawCircle2D( position: vec2, radius: number, thickness: number, color: number ): void
    /** @noSelf **/
    drawCircleMinimap( position: vec3, radius: number, thickness: number, color: number ): void
    /** @noSelf **/
    drawCircleMinimap2D( position: vec2, radius: number, thickness: number, color: number ): void
    /** @noSelf **/
    drawCircleFilled( position: vec3, radius: number, color: number ): void
    /** @noSelf **/
    drawCircleFilled2D( position: vec2, radius: number, color: number ): void
    /** @noSelf **/
    drawText( text: string, fontSize: number, position: vec3, color: number ): void
    /** @noSelf **/
    drawText2D( text: string, fontSize: number, position: vec2, color: number ): void
    /** @noSelf **/
    drawTextStroke( text: string, fontSize: number, position: vec3, color: number ): void
    /** @noSelf **/
    drawTextStroke2D( text: string, fontSize: number, position: vec2, color: number ): void
    /** @noSelf **/
    drawLine( start: vec3, end_pos: vec3, thickness: number, color: number ): void
    /** @noSelf **/
    drawLineRainbow( start: vec3, end_pos: vec3, thickness: number, speed: number ): void
    /** @noSelf **/
    drawLine2D( start: vec2, end_pos: vec2, thickness: number, color: number ): void
    /** @noSelf **/
    drawRectangle2D( position: vec2, width: number, height: number, color: number ): void
    /** @noSelf **/
    drawTriangle2D( p1: vec2, p2: vec2, p3: vec2, thickness: number, color: number ): void
    /** @noSelf **/
    drawTexture( tx: any, position: vec2, size: vec2 ): void
    /** @noSelf **/
    drawTextureUV( tx: any, position: vec2, size: vec2, uvMin: vec2, uvMax: vec2, color: number ): void
    /** @noSelf **/
    createTexture( path: string ): any
    /** @noSelf **/
    worldToScreen( worldPosition: vec3 ): vec2
}

declare global {
    const graphics : graphics;
}

export {};