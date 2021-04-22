import Ennemie from "./ennemie.js"

export function buildLevel(game,whatLevel){
    let ennemies = []
    whatLevel.forEach(  (rangee,rangeeIndex) => {
        rangee.forEach( (element,index) =>{
            
            if (element===1){
                let position ={
                    x:  index*48,
                    y:  20+24*rangeeIndex
                }
                ennemies.push(new Ennemie(game,position))
            }
            
        })
    });
    return ennemies
}
export const level_Test = [
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1], 
    [1,1,1,1,0,0,1,1,1,1],
]
