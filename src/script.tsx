import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
console.log("hello canvas")

// --- Scene Setup ---
const scene = new THREE.Scene();
console.log("hello scene")

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// --- Size Setup ---
const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,size.width / size.height);
scene.add(camera)
camera.position.z = 3

// --- Resize ---
window.addEventListener("resize", () => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);

// --- Loops ---
function animate(){
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
}
animate()