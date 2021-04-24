import Game from './game.js';

let canvas = document.getElementById("game");

let ctx = canvas.getContext('2d');

const game_width = 800;
const game_height = 600;

let game = new Game(game_width,game_height)
game.init()
let lastime =0;

export default function gameLoop(horodatage){
    let deltatime = horodatage - lastime;
    lastime =horodatage;
    
    ctx.clearRect(0,0,game_width,game_height);

    game.update(deltatime)
    game.draw(ctx)

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop);