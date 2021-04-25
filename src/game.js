import InputHandler from "./input.js"
import Joueur from "./joueur.js"
import {Level , level_Test} from "./levels.js"
import {collisionDetectionTirJoueur,collisionDetectionTirAliens} from "./collision.js"
import {Gamestate ,GAME_STATE}from "./gameState.js"
import ScoreVie from "./score.js"



export default class Game {
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth
        this.gameHeight=gameHeight
        this.gameObjects = []
        this.sizeTexte = this.gameWidth * 0.025 
        this.gamestate = new Gamestate(this)
        this.joueur= new Joueur(this)
        this.level = new Level(this,level_Test)
        this.score = new ScoreVie(this)
        new InputHandler(this.joueur,this);
        
    }
    start(){  
        this.gamestate.state = GAME_STATE.RUNNING //On indique que le jeu est "en cours"
    }
    update(deltatime){
        if(this.gamestate.state == GAME_STATE.PAUSED || this.gamestate.state == GAME_STATE.MENU) return // Ne pas update si le jeu est en pause
        
        collisionDetectionTirJoueur(this.joueur,this.level,this.gamestate,this.score)
        if(this.gamestate.state == GAME_STATE.MENU) return

        collisionDetectionTirAliens(this.level,this.joueur,this.gamestate)
        this.score.update()
        this.joueur.update(deltatime)
        this.level.update(deltatime)
        
    }
    draw(ctx){
        ctx.drawImage(document.getElementById("bg"),0,0,this.gameWidth,this.gameHeight)
        this.score.draw(ctx)
        this.level.draw(ctx)
        this.joueur.draw(ctx)
        

        // Fond noir transparent quand on appuie sur ESC/jeu en pause
        if (this.gamestate.state == GAME_STATE.PAUSED) {
            this.gamestate.paused(ctx)
        }
        // Fond noir + GAMEOVER si plus de vies
        if (this.gamestate.state == GAME_STATE.GAMEOVER) {
            this.gamestate.gameover(ctx)
        }
        if (this.gamestate.state === GAME_STATE.MENU) {
            this.gamestate.menu(ctx)
        }
        

    }
    
    escapeActions() {
        //Si le jeu est en cours; le mettre en pause.
        //Sinon, le reprendre.
        //Si le jeu est en GAME OVER, retourner au menu principal.
        if (this.gamestate.state == GAME_STATE.RUNNING) {
            this.gamestate.state = GAME_STATE.PAUSED
        } else if (this.gamestate.state == GAME_STATE.PAUSED) {
            document.getElementById("music").muted = false
            this.gamestate.state = GAME_STATE.RUNNING
        } else if (this.gamestate.state == GAME_STATE.GAMEOVER) {
            this.gamestate.state = GAME_STATE.MENU
        }
    }
    enterActions() {
       //Si le jeu est en game over, relancer une partie en appuyant sur entrée
        //Si le jeu est au menu principal, on le lance.
        if (this.gamestate.state == GAME_STATE.GAMEOVER || this.gamestate.state == GAME_STATE.MENU ) {
            this.start()
        }
    }
}