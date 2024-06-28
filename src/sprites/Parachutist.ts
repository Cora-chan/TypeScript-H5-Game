

export class Parachutist{
    private parachutistImage: HTMLImageElement = new Image();


    constructor(
        image:string
    )
    {
        this.parachutistImage.src = image
    }

    get image():HTMLImageElement {
        return this.parachutistImage
    }
}