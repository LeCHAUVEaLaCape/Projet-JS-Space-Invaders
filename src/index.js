// Groupe CATJAM
//sources :
//  https://www.youtube.com/watch?v=yna816VY8rg
//  https://www.youtube.com/watch?v=3EMxBkqC4z0
//  https://developer.mozilla.org/fr/docs/Web/JavaScript
import Game from './game.js';


    let canvas = document.getElementById("game");

    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled =false;

    const game_width = 800;
    const game_height = 600;

    let game = new Game(game_width,game_height)
    // game.start()
    let lastime =0;

    function gameLoop(horodatage){
        
        let deltatime = horodatage - lastime;
        lastime =horodatage;
        
        ctx.clearRect(0,0,game_width,game_height);

        game.update(deltatime)
        game.draw(ctx)

        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop);

