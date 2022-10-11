
/** @customConstructor vec2 */
declare class vec2 {
    add( x: vec2 ): vec2
    sub( x: vec2 ): vec2
    mul( x: number ): vec2
    x: number;
    y: number;
    constructor(x: number, y: number);
    dot( b: vec2 ): number
    cross( b: vec2 ): vec2
    normalize( ): vec2
    equals( b: vec2, tolerance: number ): boolean
    toString( ): string
    distance( b: vec2 ): number
    dist( b: vec2 ): number
    distanceSqr( b: vec2 ): number
    distSqr( b: vec2 ): number
    isValid( ): boolean
    isZero( ): boolean
    extend( b: vec2, length: number ): vec2
    extended( b: vec2, length: number ): vec2
    projectOn( segmentStart: vec2, segmentEnd: vec2 ): projectionInfo
    to3D( y: number ): vec3
}