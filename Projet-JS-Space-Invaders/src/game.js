import InputHandler from "./input.js"
import Joueur from "./joueur.js"
import {Level , level_Test} from "./levels.js"
import {collisionDetection} from "./collision.js"

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
        this.level = new Level(this,level_Test)
        
        new InputHandler(this.joueur,this);
    }
    update(deltatime){
        if(this.GAMESTATE == GAMESTATE.PAUSED) return // Ne pas update si le jeu est en pause
        
        collisionDetection(this.joueur,this.level)

        this.joueur.update(deltatime)
        this.level.update(deltatime)
    }
    draw(ctx){
        // affiche chaque alien dans le ctx
        this.level.draw(ctx)
        this.joueur.dessin(ctx)
        
        // Fond noir transparent quand on appuie sur ESC/jeu en pause
        if (this.GAMESTATE == GAMESTATE.PAUSED) {  
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fill()
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
        // Fond noir + GAMEOVER si plus de vies
        if (this.GAMESTATE == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight)
            ctx.fillStyle = "rgb(0,0,0)"
            ctx.fill()
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }

    }
    
    escapeActions() {
        //Si le jeu est en cours; le mettre en pause.
        //Sinon, le reprendre.
        //Si le jeu est en GAME OVER, retourner au menu principal.
        if (this.GAMESTATE == GAMESTATE.RUNNING) {
            this.GAMESTATE = GAMESTATE.PAUSED
        } else if (this.GAMESTATE == GAMESTATE.PAUSED) {
            this.GAMESTATE = GAMESTATE.RUNNING
        } else if (this.GAMESTATE == GAMESTATE.GAMEOVER) {
            //retour au main menu a faire
        }

    }
    enterActions() {
        //Si le jeu est en game over, relancer une partie en appuyant sur entrée
        if (this.GAMESTATE == GAMESTATE.GAMEOVER) {
            this.init()
        }
    }
}