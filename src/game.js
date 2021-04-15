import InputHandler from "./input.js"
import Joueur from "./joueur.js"
import Ennemie from "./ennemie.js"
import {buildLevel,level_Test} from "./levels.js"


const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
}




export default class Game {
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight
        
    }
    init(){

        this.GAMESTATE = GAMESTATE.RUNNING //On indique que le jeu est "en cours".

        this.joueur= new Joueur(this)

        this.ennemies = buildLevel(this.gameHeight,level_Test) //   construit le level
        
        new InputHandler(this.joueur,this);
    }
    update(deltatime){
        if(this.GAMESTATE == GAMESTATE.PAUSED) return // Ne pas update si le jeu est en pause
        this.joueur.update(deltatime)
        
    }
    draw(ctx){
        this.joueur.dessin(ctx)


        // Fond noir transparent quand on appuie sur ESC/jeu en pause
        if (this.GAMESTATE == GAMESTATE.PAUSED) {  
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill()
        }

        // affiche chaque ennemie dans
        this.ennemies.forEach(e=>{
            e.draw(ctx)
        })
        
    }
    
    togglePause(){
        //Si le jeu est en cours; le mettre en pause.
        //Sinon, le reprendre.
        if(this.GAMESTATE == GAMESTATE.RUNNING){
            this.GAMESTATE = GAMESTATE.PAUSED
        }else{
            this.GAMESTATE = GAMESTATE.RUNNING
        }

    }
}