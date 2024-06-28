export class Background {
    private backgroundImage: HTMLImageElement = new Image();


    constructor(
        image:string
    )
    {
        this.backgroundImage.src = image
    }

    get image():HTMLImageElement {
        return this.backgroundImage
    }
}