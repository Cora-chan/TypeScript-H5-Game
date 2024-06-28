

export class CanvasView {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvasName: string){
        this.canvas = document.querySelector(canvasName) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error('Canvas context could not be retrieved.');
        }
    }

    clear(): void {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    
    
   

}