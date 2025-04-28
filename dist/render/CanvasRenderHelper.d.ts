import { default as RenderHelper } from './RenderHelper';

export default class CanvasRenderHelper implements RenderHelper {
    private readonly context;
    constructor(context: CanvasRenderingContext2D);
    renderLine(xFrom: number, yFrom: number, xTo: number, yTo: number, width: number, color: string): void;
}
