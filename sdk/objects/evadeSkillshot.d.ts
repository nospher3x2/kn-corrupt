declare class evadeSkillshot {
    start: vec3;
    end: vec3;
    missilePosition: vec3;
    spellName: string;
    polygon: vec3[];
    range: number;
    radius: number;
    speed: number;
    isAboutToHit( time: number, unit: aiBaseClient ): boolean
    isSafe( position: vec3 ): boolean
}

