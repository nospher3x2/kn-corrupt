/** @customConstructor vec3 */
declare class Vector3 {
    constructor();
    constructor(x: number);
    constructor(x: number, y: number);
    constructor(x: number, y: number, z: number);


    add(x: Vector3): Vector3
    sub(x: Vector3): Vector3
    mul(x: number): Vector3
    x: number;
    y: number;
    z: number;
    dot(b: Vector3): number
    cross(b: Vector3): Vector3
    normalized(): Vector3
    equals(b: Vector3, tolerance: number): boolean
    toString(): string
    distance(b: Vector3): number
    dist(b: Vector3): number
    distanceSqr(b: Vector3): number
    distSqr(b: Vector3): number
    distance2D(b: Vector3): number
    dist2D(b: Vector3): number
    distance2DSqr(b: Vector3): number
    dist2DSqr(b: Vector3): number
    length(): number
    length2D(): number
    lengthSqr(): number
    length2DSqr(): number
    angle(b: Vector3): number
    perp1(): Vector3
    perp2(): Vector3
    rotateAngleAxis(degrees: number, axis: Vector3): Vector3
    clampLength(min: number, max: number): Vector3
    isValid(): boolean
    isZero(): boolean
    isUnit(): boolean
    isUnitform(): boolean
    extend(b: Vector3, length: number): Vector3
    extended(b: Vector3, length: number): Vector3
    lerp(b: Vector3, alpha: number): Vector3
    projectOn(segmentStart: Vector3, segmentEnd: Vector3): ProjectionInfo
    projectOnTo(b: Vector3): Vector3
    projectOnToNormal(normal: Vector3): Vector3
    closestPointOnLine(segmentStart: Vector3, segmentEnd: Vector3): Vector3
    rotateAroundPoint(b: Vector3, angle: number): Vector3
    rotate(angle: number): Vector3
    rotate90(direction: RotationDirection): Vector3
    to2D(): Vector2
}
