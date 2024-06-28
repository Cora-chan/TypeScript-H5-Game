export class Sea {
    private seaImage: HTMLImageElement = new Image();


    constructor(
        image:string
    )
    {
        this.seaImage.src = image
    }

    get image():HTMLImageElement {
        return this.seaImage
    }
}