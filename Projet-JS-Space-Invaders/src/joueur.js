export default class Joueur{
    constructor(game){
        this.player =   document.getElementById("img_player")
        this.game_width=    game.gameWidth
        this.game_height=   game.gameHeight
        this.width=     this.player.naturalWidth;
        this.height =   this.player.naturalHeight;
        this.maxspeed = 6;
        this.speed= 0;
        this.position = {
            x: this.game_width /2 - this.width/2,
            y: game.gameHeight - this.height - 50,
        }
        // tableau des tirs
        this.tableau = []
        this.game =game
    }
    dessin(ctx){
        this.tableau.forEach(e=>{
            e.draw(ctx)
        })
        ctx.drawImage(this.player,this.position.x,this.position.y)
    }
    update(deltatime){
        this.position.x +=this.speed;
        
        this.tableau = this.tableau.filter(e=> e.update() ==false)

        if (this.position.x <= 0) this.position.x =0
        if(this.position.x+this.width > 800) this.position.x= this.game_width-this.width
    }
    bougegauche(){
        this.speed= -this.maxspeed
    }
    bougedroite(){
        this.speed= this.maxspeed
    }
    stop(){
        this.speed =0;
    }
    actionTirer(){
        this.tableau.push(new Tir(this.position.x,this.position.y,this.game))
    }
}
class Tir{
    constructor(positionX,positionY,game){
        this.image = document.getElementById('img_tir')
        this.position ={
            x: positionX,
            y: positionY,
        }
        this.size = 16
        this.aliens =game.level.ennemies
        this.level = game.level
        this.vitesseDesTirs= 5
    }
    update(){
        this.position.y += -this.vitesseDesTirs
        // Retourne true ou false
        // pour supprimer le tir lorsqu'il sort de l'écran (true)
        return (this.position.y<0)
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y)
    }
}