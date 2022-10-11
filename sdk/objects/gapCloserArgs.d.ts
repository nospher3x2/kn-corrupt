declare class gapCloserArgs {
    type: GapCloserType;
    target: attackableUnit|aiBaseClient;
    startTime: number;
    endTime: number;
    startPosition: vec3;
    endPosition: vec3;
    isUnstoppable: boolean;
    isCC: boolean;
}
