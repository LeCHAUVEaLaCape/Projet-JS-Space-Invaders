import {GAME_STATE }from "./gameState.js"

export function collisionDetectionTirJoueur(joueur,level,gamestate,score){
    // console.error(tableau2.lenRow)
    let tirADelete 
    let alienADelete
    let alienRowToDelete

    function temp(indexTir){
        for (let k in level.aliens){
            for(let i in level.aliens[k]){

                if(level.aliens[k][i]!=null){
                    if (joueur.tableau[indexTir].position.y>=level.aliens[k][i].position.y 
                        && joueur.tableau[indexTir].position.y<=level.aliens[k][i].position.y+level.height
                        && joueur.tableau[indexTir].position.x>=level.aliens[k][i].position.x
                        && joueur.tableau[indexTir].position.x <= level.aliens[k][i].position.x+level.width){ //X
                        // console.log("touché")
                        // noter les index
                        level.maxSpeed +=0.05 
                        if (level.speed<0){
                            level.speed = -level.maxSpeed
                        }else{
                            level.speed = level.maxSpeed
                        }
                        alienADelete =i
                        alienRowToDelete =k
                        tirADelete =indexTir
                        return true
                    };
                    
                }
            }
        }
        return false
    }
    // On parcours le tableau des "tirs"
    for (let j in joueur.tableau){
        if (temp(j)==true) break
    }

    // A OPTIMISER ?
    // Collision Tir -> Alien ==true
    if (tirADelete != undefined){
        score.score += 10
        // Pour supprimer le tir
        let res =[] 
        for (let i in joueur.tableau){
            if (i!=tirADelete)res.push(joueur.tableau[i])
        }
        joueur.tableau =res
        
        // Pour suppprimer l'alien
        res=[] 
        for (let i in level.aliens){
            let resTmp =[]
            for (let j in level.aliens[i]){
                (j==alienADelete && i ==alienRowToDelete) ?resTmp.push(null): resTmp.push(level.aliens[i][j]);
            }
            res.push(resTmp)
        }
        level.aliens =res

        // Redefinit les bords à droite et à gauche des aliens
        // pour les collisions avec l'ecran
        function tmpDroite(j){
            for (let i=level.aliens.length-1;i>=0;i--){
                if (level.aliens[i][j]!= null){
                    level.rowDroite = i
                    level.indexDroite =j
                    droite =true
                    break
                }
            }
        }
        function tmpGauche(j) {
            for(let i=level.aliens.length-1;i>=0;i--){
                if (level.aliens[i][j]!=null){
                    level.rowGauche = i
                    level.indexGauche = j
                    gauche= true
                    break
                }
            }
        }
        let droite = false
        let gauche = false
        for (let j in level.aliens[0]){
            if(gauche==false) tmpGauche(j)
        }
        for (let j =level.aliens[0].length-1;j>=0;j--){
            if(droite==false) tmpDroite(j)
        }
        // Si il n'y a plus d'alien
        if (droite==false && gauche==false){
            document.location.reload()
            // return 
        }
        //recherche l'alien le plus bas
        function tmpBas(i){
            for (let j in level.aliens[i]){
                if (level.aliens[i][j]!=null){
                    level.rowBas = i
                    level.indexBas = j
                    // console.error(level.rowBas,level.indexBas)
                    return true
                }
            }
            return false
        }
        for (let i=level.aliens.length-1;i>=0;i--){
            if (tmpBas(i)==true) break
        }
        level.indexRefreshment()

    }
    // Si alien le plus bas est à la meme hauteur que joueur
    if( level.aliens[level.rowBas][level.indexBas].position.y+ level.height >= joueur.position.y 
        && level.aliens[level.rowBas][level.indexBas].position.y <= joueur.position.y + joueur.height){

            gamestate.state = GAME_STATE.GAMEOVER // Collision

    }
}
export function collisionDetectionTirAliens(level,joueur,gamestate){
    for (let i in level.tableau){
        if(level.tableau[i].position.y>=joueur.position.y
            && level.tableau[i].position.y<=joueur.position.y+joueur.height
            && level.tableau[i].position.x>=joueur.position.x
            && level.tableau[i].position.x<= joueur.position.x+joueur.width){
            joueur.vie -= 1;
            level.tableau = []

            if (joueur.vie <0){
                gamestate.state = GAME_STATE.GAMEOVER
            }
            // console.error(joueur.vie)
            return
        }
    }
}
