import { Boat } from "../sprites/Boat";
import { Sea } from "../sprites/Sea";
import { CanvasView } from "../view/CanvasView";
import { IDroppingImage } from "../utils/IdroppingImage";

class Collision{

    public resetGame(boat:Boat) {
        boat.score = 0;
        boat.lives = 3;
        
    }
    
    public isColliding(obj1: IDroppingImage, obj2: { x: number, y: number, width: number, height: number }): boolean {
        return (
            obj1.y + obj1.img.height >= obj2.y &&
            obj1.x + obj1.img.width >= obj2.x &&
            obj1.x <= obj2.x + obj2.width
        );
    }

    public handleCollision(droppingImages:IDroppingImage[], moveableX:number, view:CanvasView, boat:Boat, sea:Sea){
        for (let i = 0; i <droppingImages.length; i++) {
            const imgObj = droppingImages[i];

            // Check for collision with moveable image
            if (this.isColliding(imgObj, { x: moveableX, y: view.canvas.height - boat.image.height - sea.image.height, width: boat.image.width, height: boat.image.height })) {
                droppingImages.splice(i, 1);    
                     
                boat.score = boat.score + 10;
                console.log(boat.score)
                i--;
            }

            // Check for collision with bottom image
            if (this.isColliding(imgObj, { x: (view.canvas.width - sea.image.width) / 2, y: view.canvas.height - sea.image.height, width: sea.image.width, height: sea.image.height })) {
                droppingImages.splice(i, 1);
                boat.lives--
                if (boat.lives === 0) {
                    alert('Game Over');
                    this.resetGame(boat);
                }
                i--;
            }
        }
    }
}

export default Collision;