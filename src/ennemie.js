export default class Ennemie {
    //créer un ennemie avec sa position (x et y)
    constructor(game,position){
        this.image = document.getElementById("img_ennemie01")
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.width = this.image.naturalWidth 
        this.height = this.image.naturalHeight
        this.position = position
    }
    update(){// pas utiliser
    }
    
    draw(ctx){ // pas utiliser
        // ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }
}