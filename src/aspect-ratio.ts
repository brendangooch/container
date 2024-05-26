/**
 * 
 */

export default class AspectRatio {

    private aspect: number = 1;

    constructor(width: number, height: number) {
        this.aspect = width / height;
    }

    width(height: number): number {
        return this.aspect * height;
    }

    height(width: number): number {
        return width / this.aspect;
    }

};