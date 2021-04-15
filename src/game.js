import InputHandler from "./input.js"
import Joueur from "./joueur.js"
import Ennemie from "./ennemie.js"
import {buildLevel,level_Test} from "./levels.js"

export default class Game {
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight
        
    }
    init(){
        this.joueur= new Joueur(this)

        this.ennemies = buildLevel(this.gameHeight,level_Test) //   construit le level
        
        new InputHandler(this.joueur,this.ctx);
    }
    update(deltatime){
        this.joueur.update(deltatime)
    }
    draw(ctx){
        this.joueur.dessin(ctx)
        
        // affiche chaque ennemie dans
        this.ennemies.forEach(e=>{
            e.draw(ctx)
        })
        
    }
}