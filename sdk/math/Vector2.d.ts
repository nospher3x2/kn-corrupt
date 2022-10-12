
/** @customConstructor vec2 */
declare class Vector2 {
    add( x: Vector2 ): Vector2
    sub( x: Vector2 ): Vector2
    mul( x: number ): Vector2
    x: number;
    y: number;
    constructor(x: number, y: number);
    dot( b: Vector2 ): number
    cross( b: Vector2 ): Vector2
    normalize( ): Vector2
    equals( b: Vector2, tolerance: number ): boolean
    toString( ): string
    distance( b: Vector2 ): number
    dist( b: Vector2 ): number
    distanceSqr( b: Vector2 ): number
    distSqr( b: Vector2 ): number
    isValid( ): boolean
    isZero( ): boolean
    extend( b: Vector2, length: number ): Vector2
    extended( b: Vector2, length: number ): Vector2
    projectOn( segmentStart: Vector2, segmentEnd: Vector2 ): ProjectionInfo
    to3D( y: number ): Vector3
}