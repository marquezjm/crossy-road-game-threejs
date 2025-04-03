import * as THREE from "three"
import { Renderer } from "./components/Renderer"
import { Camera } from "./components/Camera"
import { initializePlayer, player } from "./components/Player"
import { initializeMap, map } from "./components/Map"
import { DirectionalLight } from "./components/DirectionalLight"
import { animateVehicles } from "./animateVehicles"
import './style.css'
import './collectorsUserInput'
import { animatePlayer } from "./animatePlayer"
import { hitTest } from "./hitTest"

const scene = new THREE.Scene()
scene.add(player)
scene.add(map)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const dirLight = DirectionalLight()
dirLight.target = player
player.add(dirLight)

const camera = Camera()
player.add(camera)

const scoreDom = document.getElementById('score')
const resultDom = document.getElementById('result-container')

initializeGame()

document
    .querySelector('#retry')
    ?.addEventListener('click', initializeGame)

function initializeGame(){
    initializePlayer()
    initializeMap()

    if(scoreDom) scoreDom.innerText = '0'
    if(resultDom) resultDom.style.visibility = 'hidden'
}

const renderer = Renderer()
renderer.setAnimationLoop(animate)

function animate(){
    animateVehicles()
    animatePlayer()
    hitTest()

    renderer.render(scene,camera)
}