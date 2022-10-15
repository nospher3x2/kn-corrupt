import { round } from "../../../../utils/Round";

class PathTracker {

    /** @noSelf */
    private static currentCallbacks = [
        { function: PathTracker.onNewPath, type: cb.newPath },
        { function: PathTracker.onDraw, type: cb.draw }
    ]

    /** @noSelf */
    private static updateCallbacks(status: boolean) {
        for (const callback of PathTracker.currentCallbacks) {
            if (status) {
                cb.add(callback.type, callback.function);
            } else {
                cb.remove(callback.type, callback.function);
            }
        }
    }

    //Variables
    private static menu: Menu;
    private static cache = new LuaTable<number, Vector3[]>();

    /** @noSelf */
    public static callbackMenu(menuElementObj: MenuElement, value: boolean) {
        PathTracker.updateCallbacks(value);
        if (!value) {
            for (const [networkId] of PathTracker.cache) {
                PathTracker.cache.delete(networkId);
            }
        }
    }

    /** @noSelf */
    private static callbackColor(menuElementObj: MenuElement, value: boolean) {
        const rainbowValue = PathTracker.menu.getByKey("colors.rainbow").value;
        const changeValue = !rainbowValue;
        // PathTracker.menu.getByKey("colors.dots").hide(changeValue);
        PathTracker.menu.getByKey("colors.lines").hide(changeValue);
        PathTracker.menu.getByKey("colors.text").hide(changeValue);
    }

    /** @noSelf */
    private static onNewPath(sender: AIBaseClient, path: Array<Vector3>, isDash: boolean, speed: number) {
        if (!sender.isHero || !sender.isVisible || sender.isDead) return;

        const isMe = sender.networkId == player.networkId;

        if (isMe && !PathTracker.menu.getByKey("shouldTrack.me").value) return;
        if (sender.isEnemy && !PathTracker.menu.getByKey("shouldTrack.enemys").value) return;
        if ((sender.isAlly && !isMe) && !PathTracker.menu.getByKey("shouldTrack.allys").value) return;

        PathTracker.cache.set(sender.networkId, path);
    }

    /** @noSelf */
    private static onDraw() {
        for (let [networkId, path] of PathTracker.cache) {
            const entity = objManager.getNetworkObject(networkId);
            if (!entity || !entity.isValid || entity.asAIBase.isDead || !entity.isVisible) {
                PathTracker.cache.delete(networkId);
                continue;
            }

            const endpath = path[path.length - 1];
            if (entity.position.dist(endpath) < 10) {
                PathTracker.cache.delete(networkId);
                continue;
            }

            const dotColor = entity.isAlly ? PathTracker.menu.getByKey("colors.dots.allyDots").value : PathTracker.menu.getByKey("colors.dots.enemyDots").value;
            const lineColor = entity.isAlly ? PathTracker.menu.getByKey("colors.lines.allyLines").value : PathTracker.menu.getByKey("colors.lines.enemyLines").value;
            const textColor = entity.isAlly ? PathTracker.menu.getByKey("colors.text.allyText").value : PathTracker.menu.getByKey("colors.text.enemyText").value;
            const fontSize = PathTracker.menu.getByKey("textSettings.fontSize").value;
            const rainbowValue = PathTracker.menu.getByKey("colors.rainbow").value;
            const rainbowSpeed = PathTracker.menu.getByKey("colors.rainbowSpeed").value;
            const textSpacing = PathTracker.menu.getByKey("textSettings.spacing").value;

            for (let i = 0; i < path.length; i++) {
                const current = path[i];
                const next = path[i + 1];

                if (entity.position.dist(endpath) < 20) {
                    PathTracker.cache.delete(networkId);
                    break;
                }

                if (!next) break;

                if (entity.position.distance(current) < 30) {
                    path[i] = entity.position;
                    if (path[i - 1] == path[i]) path.splice(i - 1, 1);

                    PathTracker.cache.set(networkId, path);
                }

                if (entity.position.distance(next) > 10 && PathTracker.menu.getByKey("draw.dots").value) {
                    rainbowValue ? graphics.drawCircleRainbow(next, 10, 2, 2) : graphics.drawCircle(next, 10, 2, dotColor);
                }

                rainbowValue ? graphics.drawLineRainbow(current, next, 1, rainbowSpeed) : graphics.drawLine(current, next, 1, lineColor);
            }

            const screenPos = graphics.worldToScreen(endpath);
            const iconSize = PathTracker.menu.getByKey("iconSettings.iconSize").value;

            screenPos.y += iconSize / 2;

            switch (PathTracker.menu.getByKey("type").value) {
                case 0:
                    // getting console error using textSize function.
                    //const textSize = graphics.textSize(entity.name, PathTracker.settings.nameSettings.fontSize.value);
                    graphics.drawText2D(entity.name, fontSize, new Vector2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2), textColor);
                    break;
                case 1:
                    graphics.drawTexture(
                        PathTracker.menu.getByKey("iconSettings.squared").value ? entity.asAIBase.iconSquare : entity.asAIBase.iconCircle,
                        new Vector2(screenPos.x - iconSize / 2, (screenPos.y - (iconSize / 2)) - iconSize / 2),
                        new Vector2(iconSize, iconSize)
                    );
                    break;
            }

            if (PathTracker.menu.getByKey("draw.dots").value) {
                rainbowValue ? graphics.drawCircleRainbow(entity.position, 10, 2, rainbowSpeed) : graphics.drawCircle(entity.position, 10, 2, dotColor);
            }

            if (PathTracker.menu.getByKey("draw.health").value) {
                screenPos.y += textSpacing;
                graphics.drawText2D(`${round(entity.asAIBase.healthPercent)}%`,
                    fontSize,
                    new Vector2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2),
                    textColor
                );
            }

            if (PathTracker.menu.getByKey("draw.distance").value) {
                screenPos.y += textSpacing;
                const distance = entity.position.distance(endpath)

                graphics.drawText2D(`${round(distance)}m`,
                    fontSize,
                    new Vector2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2),
                    textColor
                );
            }

            if (PathTracker.menu.getByKey("draw.time").value) {
                screenPos.y += textSpacing;
                const time = entity.position.distance(endpath) / entity.asAIBase.characterIntermediate.moveSpeed;

                graphics.drawText2D(`${round(time, 2)}s`,
                    fontSize,
                    new Vector2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2),
                    textColor
                );
            }
        }
    }

    public static load = (menu: Menu) => {
        const pathMenu = menu.header("pathTracker", "Path Tracker");
        PathTracker.menu = pathMenu;
        const status = pathMenu.boolean("status", "Enabled", true, PathTracker.callbackMenu);
        pathMenu.list("type", "Type", ["Name", "Icon"], 1);

        const iconSettings = pathMenu.header("iconSettings", "Icon Settings");
        iconSettings.slider("iconSize", "Icon Size", 25, 10, 50, 1);
        iconSettings.boolean("squared", "Squared", true);

        const textSettings = pathMenu.header("textSettings", "Text Settings");
        textSettings.slider("fontSize", "Font Size", 20, 5, 50, 1);
        textSettings.slider("spacing", "Spacing", 20, 5, 100, 1);

        const shouldTrack = pathMenu.header("shouldTrack", "Should Track");
        shouldTrack.boolean("me", "Me", true);
        shouldTrack.boolean("allys", "Allys", true);
        shouldTrack.boolean("enemys", "Enemys", true);

        pathMenu.spacer("drawSpacer", "");

        const drawMenu = pathMenu.header("draw", "Draws");

        const dots = drawMenu.boolean("dots", "Dots", true);
        dots.tooltip("Draws a dot (mini circles) in path points.");
        const health = drawMenu.boolean("health", "Health", false);
        health.tooltip("Health in porcentage");
        const distance = drawMenu.boolean("distance", "Distance", true);
        distance.tooltip("Distance in units");
        const time = drawMenu.boolean("time", "Time", true);
        time.tooltip("Time in seconds");

        const colors = pathMenu.header("colors", "Colors");

        colors.spacer("rainbowSpacer", "Rainbow");

        const rainbow = colors.boolean("rainbow", "Enabled", true, PathTracker.callbackColor);
        rainbow.tooltip("Rainbow color (Ignores color settings)");
        colors.slider("rainbowSpeed", "Speed", 2, 1, 15, 1);

        colors.spacer("blankSpace", " ");

        const text = colors.header("text", "Text");

        text.color("allyText", "Ally", graphics.rgba(255, 255, 255, 255));
        text.color("enemyText", "Enemy", graphics.rgba(255, 255, 255, 255));

        const lines = colors.header("lines", "Lines");

        lines.color("allyLines", "Ally", graphics.rgba(255, 255, 255, 255));
        lines.color("enemyLines", "Enemy", graphics.rgba(255, 255, 255, 255));

        const dotsC = colors.header("dots", "Dots");

        dotsC.color("allyDots", "Ally", graphics.rgba(255, 255, 255, 255));
        dotsC.color("enemyDots", "Enemy", graphics.rgba(255, 255, 255, 255));

        if (rainbow.value) {
            lines.hide(true);
            dots.hide(true);
            text.hide(true);
        }

        //callbacks
        PathTracker.updateCallbacks(status.value);
    }

    public static unload = (menu: Menu) => {
        PathTracker.updateCallbacks(false);
        menu.delete("pathTracker");
    }

}

export { PathTracker };