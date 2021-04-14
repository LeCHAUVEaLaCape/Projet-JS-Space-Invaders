export default class Tir{
    constructor(joueur){
        this.image =document.getElementById("img_tir")
        this.position = {x: joueur.x+ joueur.width/2, y : joueur.y} //position x à revoir
        this.speed = {y:7}
        
    }
    dessin(ctx){
        ctx.drawImage(this.image,10,10)
    }
    update(deltatime){//deltatime??
        this.position.y+= -this.speed
    }
}