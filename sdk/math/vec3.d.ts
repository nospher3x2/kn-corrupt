declare class vec3 {
    constructor();
    constructor(x: number);
    constructor(x: number, y: number);
    constructor(x: number, y: number, z: number);


    add( x: vec3 ): vec3
    sub( x: vec3 ): vec3
    mul( x: number ): vec3
    x: number;
    y: number;
    z: number;
    dot( b: vec3 ): number
    cross( b: vec3 ): vec3
    normalized( ): vec3
    equals( b: vec3, tolerance: number ): boolean
    toString( ): string
    distance( b: vec3 ): number
    dist( b: vec3 ): number
    distanceSqr( b: vec3 ): number
    distSqr( b: vec3 ): number
    distance2D( b: vec3 ): number
    dist2D( b: vec3 ): number
    distance2DSqr( b: vec3 ): number
    dist2DSqr( b: vec3 ): number
    length( ): number
    length2D( ): number
    lengthSqr( ): number
    length2DSqr( ): number
    angle( b: vec3 ): number
    perp1( ): vec3
    perp2( ): vec3
    rotateAngleAxis( degrees: number, axis: vec3 ): vec3
    clampLength( min: number, max: number ): vec3
    isValid( ): boolean
    isZero( ): boolean
    isUnit( ): boolean
    isUnitform( ): boolean
    extend( b: vec3, length: number ): vec3
    extended( b: vec3, length: number ): vec3
    lerp( b: vec3, alpha: number ): vec3
    projectOn( segmentStart: vec3, segmentEnd: vec3 ): projectionInfo
    projectOnTo( b: vec3 ): vec3
    projectOnToNormal( normal: vec3 ): vec3
    closestPointOnLine( segmentStart: vec3, segmentEnd: vec3 ): vec3
    rotateAroundPoint( b: vec3, angle: number ): vec3
    rotate( angle: number ): vec3
    rotate90( direction: RotationDirection ): vec3
    to2D( ): vec2
}
