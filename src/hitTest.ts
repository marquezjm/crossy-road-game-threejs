import * as THREE from "three"
import { metadata as rows } from "./components/Map"
import { player, position } from "./components/Player"

const resultDom = document.getElementById('result-container')
const finalScoreDOM = document.getElementById('final-score')

export function hitTest(){
    const row:{
                type:string,
                direction:boolean,
                speed:number,
                vehicles:{initialTileIndex:number, color:number, ref: THREE.Group | null}[]
                    
            } = rows[position.currentRow -1 ]
    if(!row) return

    if(row.type === 'car' || row.type === 'truck'){
        const playerBoundingBox = new THREE.Box3()
        playerBoundingBox.setFromObject(player)

        row.vehicles.forEach(({ref}) =>{
            if(!ref) throw Error('Vehicle reference is missing')
                
            const vehicleBoundingBox = new THREE.Box3()
            vehicleBoundingBox.setFromObject(ref)
            
            if(playerBoundingBox.intersectsBox(vehicleBoundingBox)){
                if(!resultDom || !finalScoreDOM) return
                resultDom.style.visibility='visible'
                finalScoreDOM.innerHTML = position.currentRow.toString()
            }
        })
    }
}