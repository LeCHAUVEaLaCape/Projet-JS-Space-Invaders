export default class Joueur{
    constructor(game_width,game_height){
        this.player =   document.getElementById("img_player")
        this.game_width=    game_width
        this.width=     this.player.clientWidth;
        console.log(this.player.clientWidth)
        this.height =   this.player.naturalHeight;
        this.maxspeed = 7;
        this.speed= 0;
        this.position = {
            x: game_width /2 - this.width/2,
            y: game_height - this.height - 50,
        }

        this.tir = document.getElementById("img_tir")
        this.tir_position = {x: this.position.x+ this.width/2, y : this.position.y}
        this.tir_maxspeed = 8
        this.tir_speed = 0
    }
    dessin(ctx){
        // ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        // ctx.fillStyle="#fd004d"
        ctx.drawImage(this.player,this.position.x,this.position.y)
    }
    dessin_tir(ctx){
        ctx.drawImage(this.tir,this.tir_position.x,this.tir_position.y)
        // this.tir_position.y+= -this.tir_speed.y
    }
    update(deltatime){
        this.position.x +=this.speed;
        if (this.position.x<=0) this.position.x =0
        if(this.position.x+this.width>800) this.position.x= this.game_width-this.width
        
        this.tir_position.y +=this.tir_speed
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
        this.tir_speed= -this.tir_maxspeed
    }
}