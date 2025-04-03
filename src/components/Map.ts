import * as THREE from 'three'
import {Grass} from './Grass'
import { Tree } from './Tree'
import { Road } from './Road'
import { Car } from './Car'
import { Truck } from './Truck'
import { generateRows } from '../utilities/generateRow'

export const metadata:any[] = []

export const map = new THREE.Group()

export function initializeMap(){
    metadata.length = 0
    map.remove(...map.children)
    for(let rowIndex = 0; rowIndex > -5; rowIndex--){
        const grass = Grass(rowIndex)
        map.add(grass)
    }
    addRows()
}

export function addRows(){
    const newMetaData = generateRows(20)

    const startIndex = metadata.length

    metadata.push(...newMetaData)

    newMetaData.forEach((rowData,index)=>{
        const rowIndex = startIndex + index + 1
        if(rowData.type === 'forest'){
            const row = Grass(rowIndex)
            rowData.trees?.forEach(({tileIndex,height}:{tileIndex:number,height:number})=>{
                const tree = Tree(tileIndex,height)
                row.add(tree)
            })
            map.add(row)
        }

        if(rowData.type ==='car'){
            const row = Road(rowIndex)
            rowData.vehicles?.forEach((vehicle:{initialTileIndex:number, color:number, ref: THREE.Group | null})=>{
                const car = Car(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                )
                vehicle.ref = car
                row.add(car)
            })
            map.add(row)
        }
        if(rowData.type ==='truck'){
            const row = Road(rowIndex)
            rowData.vehicles?.forEach((vehicle:{initialTileIndex:number, color:number, ref: THREE.Group | null})=>{
                const truck = Truck(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                )
                vehicle.ref = truck
                row.add(truck)
            })
            map.add(row)
        }
    })
}