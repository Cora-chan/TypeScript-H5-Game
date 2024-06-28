

export class Plane {
    private planeImage: HTMLImageElement = new Image();


    constructor(
        image:string
    )
    {
        this.planeImage.src = image
    }

    get image():HTMLImageElement {
        return this.planeImage
    }
}