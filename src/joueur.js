import Tir from "./Tir.js";
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
        this.cooldown =0
    }
    dessin(ctx){
        this.tableau.forEach(e=>{ // A VOIR
            e.draw(ctx)
        })
        ctx.drawImage(this.player,this.position.x,this.position.y)
    }
    update(deltatime){
        this.cooldown +=deltatime
        
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
        if (this.cooldown>1000){
            this.tableau.push(new Tir(this.position.x,this.position.y,this.game))
            this.cooldown =0
        }
    }
}
