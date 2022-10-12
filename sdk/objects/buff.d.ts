declare class Buff {
    name: string;
    valid: boolean;
    caster: GameObject;
    type: BuffType;
    startTime: number;
    endTime: number;
    remainingTime: number;
    stacks: number;
    counter: number;
}
