const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 6.9 
const clipSizeFactor : number = 17.9 
const deg : number = Math.PI / 2 
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#00C853",
    "#6200EA",
    "#F57F17", 
    "#880E4F"
]  
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {
    
    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawMidClipSquare(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        const clipSize : number = Math.min(w, h) / sizeFactor
        context.save()
        context.translate(w / 2, h / 2)
        DrawingUtil.drawLine(context, 0, 0, clipSize * sf1, clipSize * sf1)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.rotate(j * sf3 * Math.PI / 2)
            DrawingUtil.drawLine(context, 0, 0, -size * sf2, 0)
            context.restore()
        }
        context.fillRect(-size, -size * sf4, size, size * sf4)
        context.restore()
    }

    static drawMCLSNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawMCLSNode(context, i, scale)
    }
}
