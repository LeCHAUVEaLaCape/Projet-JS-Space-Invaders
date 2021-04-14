// on importe les autres fichiers du jeu
import Joueur from './joueur.js'
import InputHandler from './input.js'
import Tir from './tir.js'
// on 'lie' l'html à index.js
let canvas = document.getElementById("game");
// on affiche notre jeu sur un canvas, c'est sur le canvas que l'on va 'dessiner'
let ctx = canvas.getContext('2d');
// la largeur et la hauteur du jeu en pixel
const game_width = 800;
const game_height = 600;

// on crée une variable joueur de type Joueur
// on passe les dimensions du jeu en parametre pour afficher le joueur au bonne endroit
let joueur = new Joueur(game_width,game_height);
// la class InputHandler pour "ecouter" les entrées de touches
new InputHandler(joueur,ctx);

let lastime =0;
// let tir = new Tir()

// Pour faire une gameloop ici on utilise une fonction et requestAnimationFrame()
// en gros la fonction gameloop() s'appelle recursivement ==>  gameLoop() ∞ requestAnimationFrame()
const gameLoop =(horodatage)=>{
    // la deltatime est le temps qui s'est ecoulé entre maintenant (horodatage) et la dernière image (lastime ligne 18)
    // en milliseconde
    let deltatime = horodatage - lastime;
    lastime =horodatage;
    // on efface le contenu du canvas pour afficher la prochaine "frame" (image du jeu)
    ctx.clearRect(0,0,game_width,game_height);
    // afficher 
    joueur.update(deltatime);
    // dessiner le joueur
    joueur.dessin_tir(ctx);
    joueur.dessin(ctx);
    // joueur.update_tir()

    // requestAnimationFrame appel gameLoop avec en parametre 
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop);