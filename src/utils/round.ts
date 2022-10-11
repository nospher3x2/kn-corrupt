export function round(num: number, numDecimalPlaces = 0): number {
    const roundedNum = tonumber(string.format(`%.${numDecimalPlaces}f`, num));
    return roundedNum === undefined ? 0 : roundedNum;
}