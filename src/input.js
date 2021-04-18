
//keycode   38=haut   39= droite  37= gauche  40= bas
export default class InputHandler{
    constructor(joueur,game){
        // touche appuyée
        document.addEventListener('keydown',event=>{
            // alert(event.code);
            switch (event.code){
                case "ArrowLeft":
                    joueur.bougegauche();
                    break;
                case "ArrowRight":
                    joueur.bougedroite()
                    break;
                case "Space":
                    joueur.actionTirer()
                    break;
                case "Escape":
                    game.escapeActions()
                    break;
                case "Enter":
                    game.enterActions()
                    break;
            }
        });
        // touche relachée
        document.addEventListener('keyup',event =>{
            switch (event.code){
                case "ArrowLeft":
                    // pour qu'il s'arrete que si le joueur va à GAUCHE 
                    // la vitesse est un nombre NEGATIF si il va à GAUCHE
                    if (joueur.speed<0) joueur.stop();
                    break;
                case "ArrowRight":
                    // pour qu'il s'arrete que si le joueur va à DROITE
                    // la vitesse est un nombre POSITIF si il va à DROITE
                    if (joueur.speed>0) joueur.stop();
                    break;
            }
        })
    }
}
