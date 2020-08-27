import * as pixi from 'pixi.js';
import { timeStamp } from 'console';

export class Eye {
    private _x: number;
    private _y: number;
    private _w: number;
    private _h: number;
    private _innerR: number;

    private _outer: pixi.Graphics;
    private _inner: pixi.Graphics;

    constructor(x: number, y: number, w: number, h: number, innerR: number) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._innerR = innerR;

        this._outer = this.createOuter();
        this._inner = this.createInner();
        this._outer.addChild(this._inner);
    }

    private createOuter() {
        const outer = new pixi.Graphics()
            .beginFill(0xffffff)
            .drawEllipse(0, 0, this._w, this._h)
            .endFill();

        outer.position.set(this._x, this._y)

        return outer;
    }

    private createInner() {
        const outer = new pixi.Graphics()
            .beginFill(0x0068b6)
            .drawEllipse(0, 0, this._innerR, this._innerR)
            .endFill();

        return outer;
    }

    public getGraphics() {
        return this._outer;
    }

    public mouseListener(event: pixi.InteractionEvent) {
        const mousePos = event.data.getLocalPosition(this._outer);

        const r = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);
        const theta = Math.sign(-mousePos.y) * Math.acos(mousePos.x / r);

        // distance between center of outer to the point on circumference at angle theta;
        const dist = this.distAtTheta(theta);
        const limitR = Math.min(r, dist - this._innerR);

        const mat = new pixi.Matrix()
            .translate(limitR, 0)
            .rotate(-theta);
        this._inner.transform.setFromMatrix(mat);
    }

    private distAtTheta(theta: number) {
        const rx = this._w * Math.cos(theta);
        const ry = this._h * Math.sin(theta);
        return Math.sqrt(rx * rx + ry * ry);
    }
}