
export class Boat {
    private boatImage: HTMLImageElement = new Image();
    speed: number;
    moveableX: number;
    moveLeft: boolean;
    moveRight: boolean;
    lives: number;
    score: number;


    constructor(
        image:string,
        speed: number,
        moveableX:number,
        lives: number,
        score: number
    )
    {
        this.boatImage.src = image;
        this.speed = speed;
        this.moveableX = moveableX;
        this.moveLeft =false;
        this.moveRight = false;
        this.lives = lives;
        this.score = score;

    }

    get image():HTMLImageElement {
        return this.boatImage
    }
   
}