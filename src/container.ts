/**
 * 
 */

import AspectRatio from "./aspect-ratio.js";

// import AspectRatio from "./aspect-ratio.js";

export default class Container {

    private outerDiv: HTMLDivElement; // fullscreen div that contains the "container"
    private innerDiv: HTMLDivElement; // the div that resizes and contains other fixed aspect elements
    private width = { target: 0, available: 0, current: 0 };
    private height = { target: 0, available: 0, current: 0 };
    private margin = 0;
    private aspect: AspectRatio;

    public constructor(atts: {
        width: number;
        height: number;
        margin?: number;
        id?: string;
        element?: HTMLDivElement;
        parent?: HTMLElement;
    }) {
        this.width.target = atts.width;
        this.height.target = atts.height;
        if (atts.margin) this.margin = atts.margin;
        this.aspect = new AspectRatio(atts.width, atts.height);
        this.outerDiv = this.makeOuterDiv(atts.element, atts.id);
        this.configureOuterDiv();
        this.innerDiv = document.createElement('div');
        this.outerDiv.appendChild(this.innerDiv);
        if (atts.parent) this.appendTo(atts.parent);
        window.onresize = this.resize.bind(this);
        this.resize();
    }

    public appendTo(parent: HTMLElement): void {
        parent.appendChild(this.outerDiv);
    }

    public append(child: HTMLElement): void {
        this.innerDiv.appendChild(child);
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
        this.width.current *= 1 - this.margin;
        this.height.current *= 1 - this.margin;
    }

    private updateDOM(): void {
        this.innerDiv.style.width = `${this.width.current}px`;
        this.innerDiv.style.height = `${this.height.current}px`;
    }

    private isPortrait(): boolean {
        return this.height.target > this.width.target;
    }

    private updateAvailableSpace(): void {
        this.width.available = window.innerWidth;
        this.height.available = window.innerHeight;
    }

    private makeOuterDiv(element?: HTMLDivElement, id?: string): HTMLDivElement {
        let div: HTMLDivElement;
        if (element) div = element;
        else if (
            id
            && document.getElementById(id)
            && document.getElementById(id)?.nodeName === 'DIV'
        ) div = <HTMLDivElement>document.getElementById(id);
        else div = document.createElement('div');
        return div;
    }

    private configureOuterDiv(): void {
        this.outerDiv.id = 'container';
        this.outerDiv.style.width = '100vw';
        this.outerDiv.style.height = '100vh';
    }

}