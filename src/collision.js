export function collisionDetection(joueur,level,terminer){
    // console.error(tableau2.lenRow)
    let tirADelete 
    let alienADelete
    let alienRowToDelete

    function temp(indexTir){
        for (let k in level.aliens){
            for(let i in level.aliens[k]){

                if(level.aliens[k][i]!=null){
                    if (joueur.tableau[indexTir].position.y>=level.aliens[k][i].position.y 
                        && joueur.tableau[indexTir].position.y<=level.aliens[k][i].position.y+32 
                        && joueur.tableau[indexTir].position.x>=level.aliens[k][i].position.x
                        && joueur.tableau[indexTir].position.x <= level.aliens[k][i].position.x+32){ //X
                        // console.log("touché")
                        // noter les index
                        level.maxSpeed +=0.1 
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

    // A DEPLACER
    if (tirADelete != undefined){
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

        // Redefinit le bord de droite des aliens
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
            for(let i in level.aliens){
                if (level.aliens[j][i]!=null){
                    level.rowGauche = j
                    level.indexGauche = i
                    gauche= true
                    break
                }
            }
        }
        let droite = false
        let gauche = false
        for (let j = 0;j<level.aliens.length;j++){
            if(gauche==false) tmpGauche(j)
        }
        for (let j =level.aliens[0].length-1;j>=0;j--){
            if(droite==false) tmpDroite(j)
        }

        if (droite==false || gauche==false){
            terminer =true
        }
        level.indexRefreshment()
    }

}