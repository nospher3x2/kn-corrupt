
interface Notification {
    id: number;
    title: string;
    body: string;
    useIcon: boolean;
    iconTexture: any;
    iconSize: Vector2;
    borderColor: number;
    expires: number;
    priority: number;
}

class NotificationLib {

    public static notifications = new Array<Notification>();

    public static default = {
        height: 50,
        width: 300,
        padding: 10,
        border: 2,
        textSize: 15,
        textPadding: 5,
        iconSize: 30,
        iconPadding: 5,
        iconBorderRadius: 5,
        iconBorder: 2,
    }

    public static load() {
        cb.add(cb.draw, this.onDraw);
    }

    /** @noSelf */
    public static onDraw() {
        // Draw Notifications
        const notifications = this.orderNotifications();
        if (notifications.length <= 0) return;
        for (const notification of notifications) {
            this.drawNotification(notification);
        }
    }

    /** @noSelf */
    public static getPosition(notification: Notification) {
        const { height, width, padding, border, textSize, textPadding, iconSize, iconPadding, iconBorderRadius, iconBorder } = this.default;
        const notifications = this.getNotifications();
        const index = notifications.indexOf(notification);
        const x = graphics.width - width - padding;
        const y = graphics.height - (height + padding) * (index + 1);
        return new Vector2(x, y);
    }

    /** @noSelf */
    public static drawNotification(notification: Notification) {
        const { height, width, padding, border, textSize, textPadding, iconSize, iconPadding, iconBorderRadius, iconBorder } = this.default;
        const { title, body, useIcon, iconTexture, iconSize: iconSizeOverride, borderColor, expires } = notification;
        const position = this.getPosition(notification);
        const x = position.x;
        const y = position.y;
        const iconSizeX = iconSizeOverride.x;
        const iconSizeY = iconSizeOverride.y;
        const iconX = x + iconPadding;
        const iconY = y + iconPadding;
        const iconBorderX = iconX - iconBorder;
        const iconBorderY = iconY - iconBorder;
        const iconBorderWidth = iconSizeX + iconBorder * 2;
        const iconBorderHeight = iconSizeY + iconBorder * 2;
        const textX = x + iconSizeX + iconPadding * 2;
        const textY = y + textPadding;
        const textWidth = width - iconSizeX - iconPadding * 2;
        const textHeight = height - textPadding * 2;
        const textBorderX = textX - border;
        const textBorderY = textY - border;
        const textBorderWidth = textWidth + border * 2;
        const textBorderHeight = textHeight + border * 2;
        const textBorder = graphics.drawRectangle2D(new Vector2(textBorderX, textBorderY), textBorderWidth, textBorderHeight, borderColor);
        const textBackground = graphics.drawRectangle2D(new Vector2(textX, textY), textWidth, textHeight, graphics.rgba(0, 0, 0, 0.5));
        const text = graphics.drawText2D(title, textSize, new Vector2(textX, textY), graphics.rgba(255, 255, 255, 1));
        const text2 = graphics.drawText2D(body, textSize, new Vector2(textX, textY + textSize), graphics.rgba(255, 255, 255, 1));
        if (useIcon) {
            const iconBorder = graphics.drawRectangle2D(new Vector2(iconBorderX, iconBorderY), iconBorderWidth, iconBorderHeight, borderColor);
            const iconBackground = graphics.drawRectangle2D(new Vector2(iconX, iconY), iconSizeX, iconSizeY, graphics.rgba(0, 0, 0, 0.5));
            const icon = graphics.drawTexture(iconTexture, new Vector2(iconX, iconY), new Vector2(iconSizeX, iconSizeY));
        }
    }

    /** @noSelf */
    public static orderNotifications() {
        const notifications = this.getNotifications();
        if (notifications.length <= 0) return [];
        notifications.sort((a, b) => {
            return a.priority - b.priority;
        });
        return notifications;
    }

    /** @noSelf */
    public static createNotification(notification: Notification) {
        this.notifications.push(notification);
    }

    /** @noSelf */
    public static removeNotification(id: number) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
    }

    /** @noSelf */
    public static removeAllNotifications() {
        this.notifications = [];
    }

    /** @noSelf */
    public static getNotification(id: number) {
        return this.notifications.find((notification) => notification.id === id);
    }

    /** @noSelf */
    public static getNotifications() {
        return this.notifications;
    }

}

export default NotificationLib;