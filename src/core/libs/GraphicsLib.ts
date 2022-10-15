
class GraphicsLib {

    /**
     * Warning: 2+ circle = lag.
     * @param position 
     * @param radius 
     * @param width 
     * @param quality 
     * @param degree 
     */
    public static semiCircle = (position: Vector3, radius: number, width: number, quality: number, degree: number, rainbow = true, color = graphics.rgba(255, 255, 255, 255)): void => {
        const qty = (Math.PI * 2) / quality;

        let a = new Vector3(
            position.x + radius * Math.cos(6.28),
            position.y,
            position.z - radius * Math.sin(6.28)
        );

        for (let theta = qty; theta <= (Math.PI / 180) * degree; theta += qty) {
            const b = new Vector3(
                position.x + radius * Math.cos(theta + 6.28),
                position.y,
                position.z - radius * Math.sin(theta + 6.28),
            );

            rainbow ?
                graphics.drawLineRainbow(a, b, width, 3) :
                graphics.drawLine(a, b, width, color);
                
            a = b;
        }
    }
}

export default GraphicsLib;