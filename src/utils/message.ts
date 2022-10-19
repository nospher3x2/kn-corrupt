class MessageUtils {
    
    /** @noSelf */
    public static send = (message: string, messageColor = "#ffffff", logo = true, icon = false, logoColor = "#4710de", flags = 0) => {
        const logoString = logo ? `<b><font color="${logoColor}">[KN AIO]</font></b> ` : "";
        const iconString = icon ? `%i:traitCelestial%` : "";
        chat.showChat(`${logoString}<font color="${messageColor}">${message}</font> ${iconString}`, flags);
    }
}

export { MessageUtils };