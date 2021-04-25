export default class Score{
    constructor(game){
        this.game= game
        this.score = 0
        this.size = game.sizeTexte
        
    }
    update(){
        if (this.score > 999999) this.score = 999999
    }
    draw(ctx){
        let scoreTexte = `score: ${this.score}`
        // let vieTexte = `vie: ${}`
        ctx.font = `${this.size}px serif`
        ctx.fillText(scoreTexte,5*scoreTexte.length,this.size)
        // ctx.fillText()
    }
}