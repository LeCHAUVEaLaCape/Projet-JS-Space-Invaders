export const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
}
export class Gamestate{
    constructor(game){
        this.game = game
        this.state = GAME_STATE.MENU
    }
    paused(ctx){
        ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight)
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fill()
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.game.gameWidth / 2, this.game.gameHeight / 2);
        let music =document.getElementById("music")
        music.muted =true
    }
    gameover(ctx){
        ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight)
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fill()
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.game.gameWidth / 2, this.game.gameHeight / 2);
        setTimeout("location.reload();",2000);
    }
    menu(ctx){
        ctx.rect(0, 0, this.game.gameWidth, this.game.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        if (~~(0.5 + Date.now() / 500) % 2) {
            ctx.fillText(
                "Press ENTER To Start",
                this.game.gameWidth / 2,
                this.game.gameHeight / 2
            );
        }
    }
}
