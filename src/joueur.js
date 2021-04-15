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

        this.tir = document.getElementById('img_tir')
        this.tableau = []
        this.vitesseDesTirs= 7
    }
    dessin(ctx){
        this.tableau.forEach(e=>{
            ctx.drawImage(this.tir,e[0],e[1])
        })
        ctx.drawImage(this.player,this.position.x,this.position.y)
    }
    update(deltatime){
        this.position.x +=this.speed;
        
        // peut-etre pas le plus opti
        this.tableau = this.tableau.map(e=>{
            e[1]+= -this.vitesseDesTirs
            return e
        }).filter(e=>(e[1]>0))

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
        this.tableau.push([this.position.x,this.position.y])
    }
}