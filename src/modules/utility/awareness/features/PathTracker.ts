export function round(num: number, numDecimalPlaces = 0): number {
    const roundedNum = tonumber(string.format(`%.${numDecimalPlaces}f`, num));
    return roundedNum === undefined ? 0 : roundedNum;
}

class PathTracker {

    public static settings: {
        iconSettings: {
            header: Menu,
            squared: menuElement,
            size: menuElement,
        }
        textSettings: {
            header: Menu,
            fontSize: menuElement,
            textSpacing: menuElement,
        }
        colorsSettings: {
            allyText: menuElement,
            enemyText: menuElement,
            allyLines: menuElement,
            enemyLines: menuElement,
            allyDots: menuElement,
            enemyDots: menuElement,
            rainbow: menuElement,
            rainbowSpeed: menuElement,
        }
        menu: Menu,
        enabled: menuElement,
        type: menuElement,
        me: menuElement,
        ally: menuElement,
        enemy: menuElement,
        dots: menuElement,
        health: menuElement,
        distance: menuElement,
        time: menuElement,
        rainbow: menuElement,
    };

    public static TrackedPaths = new Map<number, vec3[]>();

    /** @noSelf */
    public static onNewPath(sender: aiBaseClient, path: Array<vec3>, isDash: boolean, speed: number) {
        if (!sender.isHero || !sender.isVisible || sender.isDead) return;

        if (sender.networkId == player.networkId && !PathTracker.settings.me.value) return;
        if (sender.isEnemy && !PathTracker.settings.enemy.value) return;
        if (sender.isAlly && !PathTracker.settings.ally.value) return;

        PathTracker.TrackedPaths.set(sender.networkId, path);
    }

    /** @noSelf */
    public static onDraw() {
        for (const [networkId, path] of PathTracker.TrackedPaths) {
            const entity = objManager.getNetworkObject(networkId);

            if (!entity.isValid) continue;


            let endpath = path[path.length - 1];

            if (entity.pos.dist(endpath) < 10) continue;

            const dotColor = entity.isAlly ? PathTracker.settings.colorsSettings.allyDots.value : PathTracker.settings.colorsSettings.enemyDots.value;
            const lineColor = entity.isAlly ? PathTracker.settings.colorsSettings.allyLines.value : PathTracker.settings.colorsSettings.enemyLines.value;
            const textColor = entity.isAlly ? PathTracker.settings.colorsSettings.allyText.value : PathTracker.settings.colorsSettings.enemyText.value;
            const fontSize = PathTracker.settings.textSettings.fontSize.value;

            for (let i = 0; i < path.length; i++) {
                let current = path[i];
                let next = path[i + 1];

                if (entity.pos.dist(endpath) < 20) break;

                if (!next) break;

                if (entity.pos.distance(current) < 30) {
                    path[i] = entity.pos;
                    PathTracker.TrackedPaths.set(networkId, path);
                }

                if (entity.pos.distance(next) > 10 && PathTracker.settings.dots.value) {
                    PathTracker.settings.rainbow.value ? graphics.drawCircleRainbow(next, 10, 2, 2) : graphics.drawCircle(next, 10, 2, dotColor);
                }

                PathTracker.settings.rainbow.value ? graphics.drawLineRainbow(current, next, 1, PathTracker.settings.colorsSettings.rainbowSpeed.value) : graphics.drawLine(current, next, 1, lineColor);
            }
            const screenPos = graphics.worldToScreen(endpath);
            const iconSize = PathTracker.settings.iconSettings.size.value


            switch (PathTracker.settings.type.value) {
                case 0:
                    // getting console error using textSize function.
                    //const textSize = graphics.textSize(entity.name, PathTracker.settings.nameSettings.fontSize.value);
                    graphics.drawText2D(entity.name, fontSize, screenPos, textColor);
                    break;
                case 1:
                    graphics.drawTexture(PathTracker.settings.iconSettings.squared.value ? entity.asAIBase.iconSquare : entity.asAIBase.iconCircle, new vec2(screenPos.x - iconSize / 2, screenPos.y - iconSize / 2), new vec2(iconSize, iconSize));
                    break;
            }
            if (PathTracker.settings.dots.value) {
                PathTracker.settings.rainbow.value ? graphics.drawCircleRainbow(entity.pos, 10, 2, PathTracker.settings.colorsSettings.rainbowSpeed.value) : graphics.drawCircle(entity.pos, 10, 2, dotColor);
            }

            screenPos.y += iconSize / 2;

            if (PathTracker.settings.health.value) {
                screenPos.y += PathTracker.settings.textSettings.textSpacing.value;
                graphics.drawText2D(Math.floor(entity.asAIBase.healthPercent).toString() + "%", fontSize, new vec2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2), textColor);
            }
            if (PathTracker.settings.distance.value) {
                screenPos.y += PathTracker.settings.textSettings.textSpacing.value;
                graphics.drawText2D(Math.floor(entity.pos.distance(endpath)).toString() + "m", fontSize, new vec2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2), textColor);
            }
            if (PathTracker.settings.time.value) {
                screenPos.y += PathTracker.settings.textSettings.textSpacing.value;
                graphics.drawText2D(round((entity.pos.distance(endpath) / entity.asAIBase.characterIntermediate.moveSpeed), 2).toString() + "s", fontSize, new vec2(screenPos.x - fontSize / 2, screenPos.y - fontSize / 2), textColor);
            }
        }

    }

    /** @noSelf */
    public static callbackMenu(menuElementObj: menuElement, value: boolean) {
        if(value) {
            cb.add(cb.newPath, PathTracker.onNewPath);
            cb.add(cb.draw, PathTracker.onDraw);
        } else {
            cb.remove(cb.newPath, PathTracker.onNewPath);
            cb.remove(cb.draw, PathTracker.onDraw);
            PathTracker.TrackedPaths.clear();
        }
    }

    public static load = (menu: Menu) => {
        const pathMenu = menu.header("pathTracker", "Path Tracker");
        const status = pathMenu.boolean("status", "Enabled", true, PathTracker.callbackMenu);
        const type = pathMenu.list("type", "Type", ["Name", "Icon", "None"], 1);

        const iconSettings = pathMenu.header("iconSettings", "Icon Settings");
        const iconSize = iconSettings.slider("iconSize", "Icon Size", 25, 10, 50, 1);
        const squared = iconSettings.boolean("squared", "Squared", true);

        const textSettings = pathMenu.header("textSettings", "Text Settings");
        const fontSize = textSettings.slider("fontSize", "Font Size", 20, 5, 50, 1);
        const textSpacing = textSettings.slider("spacing", "Spacing", 20, 5, 100, 1);

        pathMenu.spacer("spacer1", "Should Track");

        const me = pathMenu.boolean("me", "Me", true);
        const ally = pathMenu.boolean("allys", "Allys", true);
        const enemy = pathMenu.boolean("enemys", "Enemys", true);

        pathMenu.spacer("spacer2", "");

        const drawMenu = pathMenu.header("draw", "Draws");

        const dots = drawMenu.boolean("dots", "Dots", true);
        const health = drawMenu.boolean("health", "Health", false);
        const distance = drawMenu.boolean("distance", "Distance", true);
        const time = drawMenu.boolean("time", "Time", true);

        const colors = pathMenu.header("colors", "Colors");

        colors.spacer("rainbowSpacer", "Rainbow");
        const rainbow = colors.boolean("rainbow", "Enabled", true);
        const rainbowSpeed = colors.slider("rainbowSpeed", "Speed", 2, 1, 15, 1);

        colors.spacer("text", "Text");

        const allyText = colors.color("allyText", "Ally", graphics.rgba(255, 255, 255, 255));
        const enemyText = colors.color("enemyText", "Enemy", graphics.rgba(255, 255, 255, 255));

        colors.spacer("lines", "Lines");

        const allyLine = colors.color("allyLine", "Ally", graphics.rgba(255, 255, 255, 255));
        const enemyLine = colors.color("enemyLine", "Enemy", graphics.rgba(255, 255, 255, 255));

        colors.spacer("dots", "Dots");

        const allyDots = colors.color("allyDots", "Ally Dots", graphics.rgba(255, 255, 255, 255));
        const enemyDots = colors.color("enemyDots", "Enemy Dots", graphics.rgba(255, 255, 255, 255));


        dots.tooltip("Draws a dot (mini circles) in path points.");
        health.tooltip("Health in porcentage");
        distance.tooltip("Distance in units");
        time.tooltip("Time in seconds");
        rainbow.tooltip("Rainbow color (Ignores color settings)");

        PathTracker.settings = {
            iconSettings: {
                squared: squared,
                header: iconSettings,
                size: iconSize,
            },
            textSettings: {
                header: textSettings,
                fontSize: fontSize,
                textSpacing: textSpacing,
            },
            colorsSettings: {
                allyText: allyText,
                enemyText: enemyText,
                allyLines: allyLine,
                enemyLines: enemyLine,
                allyDots: allyDots,
                enemyDots: enemyDots,
                rainbow: rainbow,
                rainbowSpeed: rainbowSpeed,
            },
            menu: pathMenu,
            type: type,
            enabled: status,
            me: me,
            dots: dots,
            ally: ally,
            enemy: enemy,
            distance,
            health,
            time,
            rainbow,
        }


        //callbacks
        if (PathTracker.settings.enabled.value) {
            cb.add(cb.newPath, PathTracker.onNewPath);
            cb.add(cb.draw, PathTracker.onDraw);
        }
    }

    public static unload = (menu: Menu) => {
        cb.remove(cb.newPath, PathTracker.onNewPath);
        cb.remove(cb.draw, PathTracker.onDraw);
        menu.delete("pathTracker");
    }

}

export { PathTracker };