export class Level{
    constructor(game,whatLevel){
        this.aliens = buildLevel(game,whatLevel)

        this.indexGauche = 0
        this.rowGauche = 0
        this.indexDroite = whatLevel[0].length -1 //A FAIRE
        this.rowDroite = 0
        this.indexBas = 0
        this.rowBas = 0
        
        this.game = game // Attention à ne pas l'utliser n'importe comment
        this.height = 32
        this.width = 32
        
        this.stackspeed = 0
        this.maxSpeed =0.3
        this.speed =0.3
        this.game =game

        this.cooldown = 0
        this.length= this.aliens[0].length // Largeur
        this.indexPourTirAuto =[]
        this.tableau =[] // Array des "tirs"
        
        this.terminer =false
        this.indexRefreshment()
        this.ratioImage = 23.04
        this.step = 0
    }
    update(deltatime){
        this.cooldown += deltatime
        this.tirAuto()
        this.tableau = this.tableau.filter(e=> e.update() ==false)
        
        // position x du dernier alien de la rangée
        if(this.aliens[this.rowDroite][this.indexDroite].position.x+this.width> this.game.gameWidth){
            this.bougeAGauche()
            this.goDown()
        }else if (this.aliens[this.rowGauche][this.indexGauche].position.x < 0) {
            this.bougeADroite()
            this.goDown()
        }
        this.deplacement()
    }
    draw(ctx){
        for(let E of this.aliens){
            for (let e of E){
                if(e!=null)     ctx.drawImage(e.image, 0, 0, 11, 8, e.position.x, e.position.y,32,this.ratioImage)
            }
        }
        for (let e of this.tableau){
            e.draw(ctx)
        }

    }
    goDown(){
        let res =[]
        for (let i in this.aliens){
            let resTmp=[]
            for (let f of this.aliens[i]){
                if(f==null) resTmp.push(null)
                else{
                    let fTmp =f
                    fTmp.position.y += this.height
                    resTmp.push(fTmp)
                }
            }
            res.push(resTmp)
        }
        this.aliens= res
    }
    deplacement(){ // Se déplace en fonction de this.speed
        let res =[]
        for (let i in this.aliens){
            let resTmp=[]
            for (let f of this.aliens[i]){
                if (f==null) resTmp.push(null)
                else{
                    let fTmp =f
                    fTmp.position.x += this.speed + this.stackspeed
                    resTmp.push(fTmp)
                }
            }
            res.push(resTmp)
        }
        this.aliens= res
    }
    bougeADroite(){
        this.speed = this.maxSpeed
    }
    bougeAGauche(){
        this.speed = -this.maxSpeed
    }
    // Pour le tir auto des aliens
    indexRefreshment(){
        this.indexPourTirAuto= []
        for (let i in this.aliens[0]){ // ranger
            for(let j in this.aliens){ // colonne
                // 
                if(j==this.aliens.length-1) {
                    if (this.aliens[j][i]==null){
                        this.indexPourTirAuto.push(j-1);
                    }else{
                        this.indexPourTirAuto.push(parseInt(j))
                    }
                }else if (this.aliens[j][i]==null){
                    this.indexPourTirAuto.push(j-1);
                    break
                }
            }
        }
    }
    tirAuto(){
        if (this.cooldown>1000){
            this.cooldown= this.cooldown - 1000
            let index = getRandomInt(this.length) 
            if(this.indexPourTirAuto[index] != -1){
                // Selectionne un objet Alien
                let select = this.aliens[ this.indexPourTirAuto[index] ][index]

                this.tableau.push(new TirAlien(select.position.x,select.position.y+this.height,this.game))
            }
        }
    }
}
function buildLevel(game,whatLevel){
    let aliens = []
    whatLevel.forEach(  (rangee,rangeeIndex) => {
        let resTmp =[]
        rangee.forEach( (element,index) =>{
            if (element===1){
                let position ={
                    x:  index*32,
                    y:  20+32*rangeeIndex
                }
                resTmp.push(new Alien(game,position))
            }
            else{
                resTmp.push(null)
            }
        })
        aliens.push(resTmp)
    });
    
    return aliens
}
function getRandomInt(max){
    return Math.floor(Math.random()*max)
}
class TirAlien {
    constructor(positionX,positionY,game){
        this.image = document.getElementById('img_tirAlien')
        this.position ={
            x: positionX,
            y: positionY,
        }
        this.size = 16
        this.aliens =game.level.ennemies
        this.level = game.level
        this.vitesseDesTirs= 2
    }
    update(){
        this.position.y += this.vitesseDesTirs
        // Retourne true ou false
        // pour supprimer le tir lorsqu'il sort en bas de l'écran (true)
        return (this.position.y>600)
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y)
    }
}

class Alien {
    //créer un Alien avec sa position (x et y)
    constructor(game,position){
        this.image = document.getElementById("alien")
        this.width = 32
        this.height = 32
        this.position = position
    }
}
export const level_Test = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1], 
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
]