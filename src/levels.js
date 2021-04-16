import Ennemie from "./ennemie.js"

function buildLevel(game,whatLevel){
    let ennemies = []
    let lenOfRow = 0
    whatLevel.forEach(  (rangee,rangeeIndex) => {
        rangee.forEach( (element,index) =>{
            
            if (element===1){
                let position ={
                    x:  index*48,
                    y:  20+24*rangeeIndex
                }
                ennemies.push(new Ennemie(game,position))
            }else{
                lenOfRow+=1
            }
            
        })
    });
    
    return [ennemies, whatLevel[0].length-lenOfRow/whatLevel.length ] // Voir les lignes 27,28,29
}

export class Level{
    constructor(game,whatLevel){
        let tmp = buildLevel(game,whatLevel) // type Array
        this.height = document.getElementById("img_ennemie01").naturalHeight
        this.ennemies = tmp[0]
        this.lenRow =tmp[1]-1 // index zero non inclus pour la length
        this.maxSpeed =0.2
        this.speed =0.2
        this.goDown =0
    }
    update(deltatime){
        //position x du dernier alien de la rangée
        let tmp = (this.ennemies)[this.lenRow].position.x 
        
        if(tmp+ this.ennemies[this.lenRow].width > 800){
            this.speed = -this.maxSpeed
            this.goDown += this.height
        }else if (this.ennemies[0].position.x < 0) {
            this.speed = this.maxSpeed
            this.goDown += this.height
        }

        this.ennemies = this.ennemies.map( (E) =>{
            E.position.x+=this.speed  //vers la droite
            return E
        })
    }
    draw(ctx){
        this.ennemies.forEach(E=>{
            ctx.drawImage(E.image,E.position.x, E.position.y+this.goDown ,E.width,E.height)
        })
    }

}


export const level_Test = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1], 
    [1,1,1,1,0,0,1,1,1,1],
]
