import InputHandler from "./input.js"
import Joueur from "./joueur.js"
import {Level , level_Test} from "./levels.js"
import {collisionDetectionTirJoueur} from "./collision.js"

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
        this.GAMESTATE = GAMESTATE.MENU
        this.joueur= new Joueur(this)
        this.level = new Level(this,level_Test)
        
        new InputHandler(this.joueur,this);
    }
    init(){  
        this.level.init()
        this.GAMESTATE = GAMESTATE.RUNNING //On indique que le jeu est "en cours"
    }
    update(deltatime){
        if(this.GAMESTATE == GAMESTATE.PAUSED || this.GAMESTATE == GAMESTATE.MENU) return // Ne pas update si le jeu est en pause
        
        collisionDetectionTirJoueur(this.joueur,this.level)
        
        if(this.level.terminer == true){
            this.GAMESTATE= GAMESTATE.MENU
            return 
        }
        this.joueur.update(deltatime)
        this.level.update(deltatime)
        
    }
    draw(ctx){
        // affiche chaque alien dans le ctx
        this.level.draw(ctx)
        this.joueur.draw(ctx)
        
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
        if (this.GAMESTATE === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            if (~~(0.5 + Date.now() / 500) % 2) {
                ctx.fillText(
                    "Press ENTER To Start",
                    this.gameWidth / 2,
                    this.gameHeight / 2
                );
              }}

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
            this.GAMESTATE = GAMESTATE.MENU
        }
    }
    enterActions() {
       //Si le jeu est en game over, relancer une partie en appuyant sur entrée
        //Si le jeu est au menu principal, on le lance.
        if (this.GAMESTATE == GAMESTATE.GAMEOVER || this.GAMESTATE == GAMESTATE.MENU ) {
            this.init()
        }
    }
}