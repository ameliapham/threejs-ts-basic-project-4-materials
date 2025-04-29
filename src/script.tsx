import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.z = 3
scene.add(camera)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// --- Objects ---
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 16),
    new THREE.MeshBasicMaterial({
        color: "orange"
    })
)
sphere.position.x = -2

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
        color: "pink"
    })
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.15, 16, 32),
    new THREE.MeshBasicMaterial({
        color: "brown"
    })
)
torus.position.x = 2

scene.add(sphere, plane, torus)

// --- Renderer Setup ---
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// --- Resize ---
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// --- Render Loop ---
let clock = new THREE.Clock()

function animate(){
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Animation
    sphere.rotation.x = 0.1 * elapsedTime
    plane.rotation.x = 0.1 * elapsedTime
    torus.rotation.x = 0.1 * elapsedTime

    sphere.rotation.y = - 0.15 * elapsedTime
    plane.rotation.y = - 0.15 * elapsedTime
    torus.rotation.y = - 0.15 * elapsedTime

    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}
animate()