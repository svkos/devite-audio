import jsPDF from "jspdf";
import Konva from "konva";
import { SceneContext } from "konva/lib/Context";
import { RefObject } from "react";
import { PhonesSidesEnum } from "./types";

export const BASE_STAGE_WIDTH = 1519;
export const BASE_STAGE_HEIGHT = 690;
export const LEFT_PHONE_WIDTH = 775;

export const X_CENTER_RIGHT = 180;
export const Y_CENTER_RIGHT = 160;

export const X_CENTER_LEFT = 300;
export const Y_CENTER_LEFT = 160;

const BIG_SCALE_RATIO = 1;
const BOTH_SCALE_RATIO = 0.9;
const SMALL_SCALE_RATIO = 0.8;

export const getLayerScale = (side: PhonesSidesEnum) => {
    switch (side) {
        case PhonesSidesEnum.L:
            return {
                left: { x: SMALL_SCALE_RATIO, y: SMALL_SCALE_RATIO },
                right: { x: BIG_SCALE_RATIO, y: BIG_SCALE_RATIO },
            };
        case PhonesSidesEnum.R:
            return {
                left: { x: BIG_SCALE_RATIO, y: BIG_SCALE_RATIO },
                right: { x: SMALL_SCALE_RATIO, y: SMALL_SCALE_RATIO },
            };
        case PhonesSidesEnum.LR:
            return {
                left: { x: BOTH_SCALE_RATIO, y: BOTH_SCALE_RATIO },
                right: { x: BOTH_SCALE_RATIO, y: BOTH_SCALE_RATIO },
            };
    }
};

export const getLayerOffset = (size: number, scale: ReturnType<typeof getLayerScale>) => ({
    left: {
        x: -((size - size * scale.left.x) / 2),
        y: -((size - size * scale.left.y) / 2),
    },
    right: {
        x: -((size - size * scale.right.x) / 2),
        y: -((size - size * scale.right.y) / 2),
    },
});

export const clipLeftFunction = (ctx: SceneContext) => {
    ctx.beginPath();
    ctx.moveTo(10, 320);
    ctx.quadraticCurveTo(0, 110, 420, 5);
    ctx.quadraticCurveTo(470, 0, 490, 40);
    ctx.quadraticCurveTo(565, 240, 560, 320);
    ctx.quadraticCurveTo(560, 350, 525, 400);
    ctx.quadraticCurveTo(490, 480, 510, 550);
    ctx.quadraticCurveTo(530, 610, 510, 650);
    ctx.quadraticCurveTo(450, 710, 380, 650);
    ctx.quadraticCurveTo(300, 600, 251, 520);
    ctx.quadraticCurveTo(230, 480, 150, 445);
    ctx.quadraticCurveTo(80, 420, 60, 405);
    ctx.quadraticCurveTo(10, 355, 10, 320);
    ctx.closePath();
};

export const clipRightFunction = (ctx: SceneContext) => {
    ctx.beginPath();
    ctx.moveTo(738, 250);
    ctx.quadraticCurveTo(705, 80, 335, 6);
    ctx.quadraticCurveTo(300, 0, 280, 50);
    ctx.quadraticCurveTo(245, 180, 229, 300);
    ctx.quadraticCurveTo(225, 350, 265, 400);
    ctx.quadraticCurveTo(225, 350, 265, 400);
    ctx.quadraticCurveTo(297, 460, 297, 500);
    ctx.quadraticCurveTo(300, 520, 290, 620);
    ctx.quadraticCurveTo(315, 720, 418, 650);
    ctx.quadraticCurveTo(500, 570, 550, 480);
    ctx.quadraticCurveTo(590, 430, 648, 410);
    ctx.quadraticCurveTo(750, 350, 738, 250);
    ctx.closePath();
};

export const stageToPDF = (ref: RefObject<Konva.Stage>) => {
    if (ref.current) {
        var pdf = new jsPDF("l", "px", [BASE_STAGE_WIDTH, BASE_STAGE_HEIGHT]);

        pdf.addImage(
            ref.current.toDataURL({ pixelRatio: 2 }),
            0,
            0,
            BASE_STAGE_WIDTH,
            BASE_STAGE_HEIGHT,
        );

        return pdf;
    }
};
