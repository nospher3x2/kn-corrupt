class Coords {

    /** @noSelf */
    public static wardCords = [
        { standPos: new Vector3(11772.0, -71.2406005859375, 4608.0), wardPos: new Vector3(12214.0, 51.729400634765625, 5036.0) },
        { standPos: new Vector3(9305.0517578125, -71.2406005859375, 4410.6826171875), wardPos: new Vector3(8700.0, 52.89814758300781, 4508.0) },
        { standPos: new Vector3(13059.630859375, 51.39195251464844, 4297.990234375), wardPos: new Vector3(12730.0, 51.729400634765625, 4752.0) },
        { standPos: new Vector3(13025.9921875, 51.36690139770508, 3757.0048828125), wardPos: new Vector3(12452.0, -66.24720001220703, 3880.0) },
        { standPos: new Vector3(1881.91650390625, 52.83810043334961, 11237.7548828125), wardPos: new Vector3(2446.0, -71.2406005859375, 11008.0) },
        { standPos: new Vector3(4789.0966796875, -72.23546600341797, 10855.8056640625), wardPos: new Vector3(4646.0, 50.933128356933594, 11348.0) },
        { standPos: new Vector3(5494.0, -72.77693176269531, 10442.0), wardPos: new Vector3(6116.0, 55.67418670654297, 10430.0) },
        { standPos: new Vector3(11223.505859375, -67.98487854003906, 3189.2392578125), wardPos: new Vector3(10722.0, 52.25947570800781, 2992.0) },
        { standPos: new Vector3(5824.0, 51.80837631225586, 6658.0), wardPos: new Vector3(5332.0, 50.67863464355469, 6988.0) },
        { standPos: new Vector3(6574.0, 56.47679901123047, 12056.0), wardPos: new Vector3(6848.0, 53.82961654663086, 11512.0) },
        { standPos: new Vector3(8275.740234375, 51.130001068115234, 2902.5859375), wardPos: new Vector3(7962.0, 51.6821174621582, 3424.0) },
        { standPos: new Vector3(9072.0, 53.84160614013672, 8306.0), wardPos: new Vector3(9536.0, 51.20172119140625, 7986.0) },
    ]

    /** @noSelf */
    public static getBaseCoords = (team: number) => {
        if (team == 100) {
            return new Vector3(410, 182, 410);
        } else {
            return new Vector3(14340, 171, 14340);
        }
    }
}

export { Coords };