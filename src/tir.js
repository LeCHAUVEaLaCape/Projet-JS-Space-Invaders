export default class Tir{
    constructor(positionX,positionY,game){
        this.image = document.getElementById('img_tir')
        this.position ={
            x: positionX,
            y: positionY,
        }
        this.size = 16
        this.aliens =game.level.ennemies
        this.level = game.level
        this.vitesseDesTirs= 10
    }
    update(){
        this.position.y += -this.vitesseDesTirs
        // Retourne true ou false
        // pour supprimer le tir lorsqu'il sort de l'écran (true)
        return (this.position.y<0 || this.position.y>600)
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y)
    }
}