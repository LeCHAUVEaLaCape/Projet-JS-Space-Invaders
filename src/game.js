import InputHandler from "./input.js"
import Joueur from "./joueur.js"

export default class Game {
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight
        
    }
    init(){
        this.joueur= new Joueur(this)
        
        new InputHandler(this.joueur,this.ctx);
    }
    update(deltatime){
        this.joueur.update(deltatime)
    }
    draw(ctx){
        this.joueur.dessin(ctx)
        
    }
}