class ExtraCallbackLib {

    private static UPDATE_TICK = 0;
    public static SLOW_UPDATE = 97;

    public static load() {
        cb.add(cb.gameUpdate, this.onGameUpdate);
    }

    /** @noSelf */
    public static onGameUpdate() {
        ExtraCallbackLib.UPDATE_TICK++;
        if (ExtraCallbackLib.UPDATE_TICK % 5 === 0) {
            ExtraCallbackLib.UPDATE_TICK = 0;
            cb.trigger(ExtraCallbackLib.SLOW_UPDATE, (null));
        }
    }
}

export default ExtraCallbackLib;