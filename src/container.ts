/**
 * 
 */

import { AspectRatio } from "@brendangooch/maths";

export default class Container {

    private static DEFAULT_HTML_ID: string = "container";
    private static DEFAULT_MARGIN: number = 0.05;

    private div: HTMLDivElement; // the div that resizes and contains other fixed aspect elements
    private width = { target: 0, available: 0, current: 0 };
    private height = { target: 0, available: 0, current: 0 };
    private margin = 0.05;
    private aspect: AspectRatio;

    public constructor(width: number, height: number, id?: string, margin?: number) {
        this.width.target = width;
        this.height.target = height;
        this.aspect = new AspectRatio(width, height);
        if (id) this.div = <HTMLDivElement>document.getElementById(id);
        else this.div = <HTMLDivElement>document.getElementById(Container.DEFAULT_HTML_ID);
        this.margin = (margin) ? margin : Container.DEFAULT_MARGIN;
        if (this.div) {
            window.onresize = this.resize.bind(this);
            this.resize();
        }
    }

    private resize(): void {
        this.updateAvailableSpace();
        if (this.isPortrait()) this.resizePortrait();
        else this.resizeLandscape();
        this.applyMargin();
        this.updateDOM();
    }

    private resizePortrait(): void {
        let width: number;
        let height: number;
        height = Math.min(this.height.target, this.height.available);
        width = this.aspect.width(height);
        if (width > this.width.available) {
            width = this.width.available;
            height = this.aspect.height(width);
        }
        this.width.current = width;
        this.height.current = height;
    }

    private resizeLandscape(): void {
        let width: number;
        let height: number;
        width = Math.min(this.width.target, this.width.available);
        height = this.aspect.height(width);
        if (height > this.height.available) {
            height = this.height.available;
            width = this.aspect.width(height);
        }
        this.width.current = width;
        this.height.current = height;
    }

    private applyMargin(): void {
        if (this.marginRequired()) {
            this.width.current *= 1 - this.margin;
            this.height.current *= 1 - this.margin;
        }
    }

    // only apply margin if container has been scaled to less than full size
    private marginRequired(): boolean {
        return this.width.current < this.width.target;
    }

    private updateDOM(): void {
        this.div.style.width = `${this.width.current}px`;
        this.div.style.height = `${this.height.current}px`;
    }

    private isPortrait(): boolean {
        return this.height.target > this.width.target;
    }

    private updateAvailableSpace(): void {
        this.width.available = window.innerWidth;
        this.height.available = window.innerHeight;
    }

}