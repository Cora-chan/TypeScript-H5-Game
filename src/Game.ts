import { Background } from "./sprites/Background";
import { Boat } from "./sprites/Boat";
import { Parachutist } from "./sprites/Parachutist";
import { Plane } from "./sprites/Plane";
import { Sea } from "./sprites/Sea";
import { IDroppingImage } from "./utils/IdroppingImage";
import { CanvasView } from "./view/CanvasView";
import {  DROP_SPEED, MOVEABLE_SPEED,SPEED } from "./utils/setup";
import  Collision  from "./collisions/Collision"

import BOAT_IMAGE from './images/boat.png';
import BACKGROUND_IMAGE from './images/background.png';
import SEA_IMAGE from './images/sea.png';
import PARACHUTIST_IMAGE from './images/parachutist.png';
import PLANE_IMAGE from './images/plane.png'


class Game {
    private static instance: Game;
    private view: CanvasView;
    private boat: Boat;
    private sea: Sea;
    private background: Background;
    private parachutist: Parachutist;
    private plane: Plane;
    private speed: number;
    private dropSpeed: number;
    private moveableSpeed: number;
    private xPos: number;
    private moveableX : number;
    private collsion: Collision;
    private droppingImages: IDroppingImage[];

    private constructor() {
        this.view = new CanvasView('#myCanvas');
        if (!this.view.ctx) {
            throw new Error('Canvas context could not be retrieved.');
        }

        this.collsion = new Collision()
        this.speed = SPEED;
        this.dropSpeed = DROP_SPEED;
        this.moveableSpeed = MOVEABLE_SPEED;
        this.boat = new Boat(BOAT_IMAGE,this.speed,this.moveableSpeed,3,0);
        this.background=new Background(BACKGROUND_IMAGE);
        this.sea = new Sea(SEA_IMAGE);
        this.plane = new Plane(PLANE_IMAGE);
        this.parachutist = new Parachutist(PARACHUTIST_IMAGE);
        this.droppingImages = [];
        this.xPos = this.view.canvas.width;
        this.moveableX = this.view.canvas.width/2;
        window.addEventListener('keydown',this.handleKeyDown.bind(this))

    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') {
            this.moveableX -= this.moveableSpeed;
            if (this.moveableX < 0) this.moveableX = 0;
        } else if (e.key === 'ArrowRight') {
            this.moveableX += this.moveableSpeed;
            if (this.moveableX + this.boat.image.width > this.view.canvas.width) {
                this.moveableX = this.view.canvas.width - this.boat.image.width;
            }
        }
    }

    private gameLoop() {
        this.view.clear()
        this.view.ctx.drawImage(this.background.image, 0, 0, this.view.canvas.width, this.view.canvas.height);

        // Draw and update the main image
        this.view.ctx.drawImage(this.plane.image, this.xPos, 0);
        this.xPos -= this.speed;
        if (this.xPos < -this.plane.image.width) {
            this.xPos = this.view.canvas.width;
        }

        // Draw and update the dropping images
        for (let i = 0; i < this.droppingImages.length; i++) {
            const imgObj = this.droppingImages[i];
            imgObj.y += this.dropSpeed;
            this.view.ctx.drawImage(imgObj.img, imgObj.x, imgObj.y);

            // Remove the image if it falls out of the canvas
            if (imgObj.y > this.view.canvas.height) {
                this.droppingImages.splice(i, 1);
                i--;
            }
        }
        
        // Draw the bottom image
        const bottomImageY = this.view.canvas.height - this.sea.image.height;
        const bottomImageX = (this.view.canvas.width - this.sea.image.width) / 2;
        this.view.ctx.drawImage(this.sea.image, bottomImageX, bottomImageY);

        // Draw the moveable image
        const moveableImageY = bottomImageY - this.boat.image.height;
        this.view.ctx.drawImage(this.boat.image, this.moveableX, moveableImageY);

        // Draw the container for score and lives
        this.view.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.view.ctx.fillRect(10, 10, 150, 60);

         // Draw the score and lives text
         this.view.ctx.font = '16px Arial';
         this.view.ctx.fillStyle = 'black';
         this.view.ctx.fillText('Score: ' + this.boat.score, 20, 30);
         this.view.ctx.fillText('Lives: ' + this.boat.lives, 20, 50);
      
        // Handle collisions
        this.collsion.handleCollision(this.droppingImages, this.moveableX, this.view, this.boat, this.sea);
      
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public start() {
        this.plane.image.onload = () => {
            this.gameLoop();
        };
        setInterval(() => {
            this.droppingImages.push({
                img: this.parachutist.image,
                x: this.xPos + this.plane.image.width / 2 - this.parachutist.image.width / 2,
                y: this.plane.image.height,
            });
        }, 2000);
    }
    
}

export default Game;






    



