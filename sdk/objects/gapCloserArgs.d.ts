declare class GapCloserArgs {
    type: GapCloserType;
    target: AttackableUnit | AIBaseClient;
    startTime: number;
    endTime: number;
    startPosition: Vector3;
    endPosition: Vector3;
    isUnstoppable: boolean;
    isCC: boolean;
}
