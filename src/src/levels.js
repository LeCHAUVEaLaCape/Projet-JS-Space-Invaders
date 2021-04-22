export class Level{
    constructor(game,whatLevel){
        this.aliens = buildLevel(game,whatLevel)

        this.indexGauche = 0
        this.rowGauche = 0
        this.indexDroite = whatLevel[0].length -1 //A FAIRE
        this.rowDroite = 0
        
        this.tableau =[] // Array des "tirs"
        this.game = game // Attention à ne pas l'utliser n'importe comment
        this.height = 32
        this.width = 32
        
        this.stackspeed = 0
        this.maxSpeed =0.3
        this.speed =0.3
        this.game =game
    }
    update(deltatime){
        // position x du dernier alien de la rangée

        if(this.aliens[this.rowDroite][this.indexDroite].position.x+this.width> this.game.gameWidth){
            console.error(this.rowDroite,this.indexDroite)
            this.bougeAGauche()
            this.goDown()
        }else if (this.aliens[this.rowGauche][this.indexGauche].position.x < 0) {
            this.bougeADroite()
            this.goDown()
        }
        this.deplacement()
    }
    draw(ctx){
        this.aliens.forEach(E=>{
            E.forEach(e=>{
                if (e!=null)    ctx.drawImage(e.image,e.position.x, e.position.y ,e.width,e.height)
            })
        })
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
                resTmp.push(new Ennemie(game,position))
            }
            else{
                resTmp.push(null)
            }
        })
        aliens.push(resTmp)
    });
    
    return aliens
}



class Ennemie {
    //créer un ennemie avec sa position (x et y)
    constructor(game,position){
        this.image = document.getElementById("alien")
        this.width = this.image.naturalWidth 
        this.height = this.image.naturalHeight
        this.position = position
    }
}
export const level_Test = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1], 
    [1,1,1,1,0,0,1,1,1,1],
    // [1,1,1,1,0,0,1,1,1,1],
]