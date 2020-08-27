import * as pixi from 'pixi.js';
import { Eye } from './eye';
require('../css/index.scss');

const imgElem = document.getElementById('background') as HTMLCanvasElement;
const canvasElem = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvasElem) {
    throw new Error('no canvas');
}

const windowWidth = window.screen.width;
const windowHeight = window.screen.height;
let canvasWidth = 474;
let canvasHeight = 702;

if (windowWidth < 474) {
    canvasWidth = windowWidth;
    canvasHeight = Math.round(windowWidth * (702 / 474));
}

imgElem.width = canvasWidth;
imgElem.height = canvasHeight;
canvasElem.setAttribute('width', canvasWidth.toString());
canvasElem.setAttribute('height', canvasHeight.toString());

imgElem.style.width = `${canvasWidth}px`;
imgElem.style.height = `${canvasHeight}px`;
canvasElem.style.width = `${canvasWidth}px`;
canvasElem.style.height = `${canvasHeight}px`;

let app: pixi.Application;

pixi.autoDetectRenderer({ antialias: true });
app = new pixi.Application({
    view: canvasElem,
    // backgroundColor: 0xffffff,
    transparent: true,
    width: canvasElem.width,
    height: canvasElem.height,
    resolution: window.devicePixelRatio || 1,
});


function addBody(x: number, y: number, w: number, h: number) {
    const ellipse = new pixi.Graphics()
        .beginFill(0xe50012)
        .drawEllipse(0, 0, w, h)
        .endFill();

    ellipse.position.set(x, y);

    return app.stage.addChildAt(ellipse, 0);
}


addBody(217, 107, 42, 42);
addBody(165, 147, 36, 38);
const b1 = addBody(106, 188, 40, 41); // eye
addBody(162, 208, 36, 36);
const b2 = addBody(118, 269, 48, 48); // eye
addBody(149, 329, 26, 44);
addBody(183, 385, 36, 36);
const b3 = addBody(255.5, 392.5, 51, 51); // eye
const b4 = addBody(330.5, 334.5, 59, 53); // eye
addBody(338.5, 248.5, 39, 47);
addBody(343, 188, 65, 30);
const b5 = addBody(305, 122.5, 55, 55);

const eye1 = new Eye(-10.5, -3.5, 20, 20, 10);
b1.addChild(eye1.getGraphics());

const eye2 = new Eye(14, 7, 22, 22, 10.5);
b2.addChild(eye2.getGraphics());

const eye3 = new Eye(-4, 18, 18, 18, 7.5);
b3.addChild(eye3.getGraphics());

const eye4 = new Eye(21, 5, 29, 26, 12);
b4.addChild(eye4.getGraphics());

const eye5 = new Eye(13, -21, 24, 24, 11);
b5.addChild(eye5.getGraphics());


const mgr = new pixi.InteractionManager(app.renderer)
    .on('mousemove', eye1.mouseListener.bind(eye1))
    .on('mousemove', eye2.mouseListener.bind(eye2))
    .on('mousemove', eye2.mouseListener.bind(eye3))
    .on('mousemove', eye2.mouseListener.bind(eye4))
    .on('mousemove', eye2.mouseListener.bind(eye5))
    .on('touchmove', eye1.mouseListener.bind(eye1))
    .on('touchmove', eye2.mouseListener.bind(eye2))
    .on('touchmove', eye2.mouseListener.bind(eye3))
    .on('touchmove', eye2.mouseListener.bind(eye4))
    .on('touchmove', eye2.mouseListener.bind(eye5));

if (canvasWidth != 474) {
    app.stage.scale.set(canvasWidth / 474);
}

