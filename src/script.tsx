import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from "lil-gui";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

console.log("Hello, Three.js with TypeScript!");

// --- Canvas Setup ---
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// --- Scene Setup ---
const scene = new THREE.Scene();

// --- Setup Axes Helper ---
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// --- Texture ---
const texture = new THREE.TextureLoader()

const doorColorTexture = texture.load("/textures/door/basecolor.jpg")
const doorAlphaTexture = texture.load("/textures/door/alpha.jpg")
const doorHeightTexture = texture.load("/textures/door/height.jpg")
const doorNormalTexture = texture.load("/textures/door/normal.jpg")
const doorAmbientOcclusionTexture = texture.load("/textures/door/ambientOcclusion.jpg")
const doorMetalnessTexture = texture.load("/textures/door/metalness.jpg")
const doorRoughnessTexture = texture.load("/textures/door/roughness.jpg")

const matcapTexture = texture.load("/textures/matcaps/1.png")
const gradientTexture = texture.load("/textures/gradients/5.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// --- Objects ---

// MeshBasicMaterial
/*
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture,
    //color: "salmon",
    //wireframe: true,
    //transparent: true,
    //opacity: 0.5, // need transparent true
    //alphaMap: doorAlphaTexture,
    //side: THREE.DoubleSide
})
*/

/*
// MeshNormalMaterial
const material = new THREE.MeshNormalMaterial({
    flatShading: true
})
*/

/*
// MeshMatcapMaterial
const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
*/

/*
// MeshDepthMaterial
const material = new THREE.MeshDepthMaterial()
*/

/*
// MeshLambertMaterial
const material = new THREE.MeshLambertMaterial({
    color: "salmon"
})
*/

/*
// MeshPhongMaterial
const material = new THREE.MeshPhongMaterial({
    color: "salmon",
    shininess: 100,
    specular: "blue"
})
*/

/*
// MeshToonMaterial
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
const material = new THREE.MeshToonMaterial({
    color: "salmon",
    gradientMap: gradientTexture
})
*/

/*
// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.5,
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 2,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
})
*/

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.5,
    metalness: 0.5,
    map: doorColorTexture,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 2,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    //transparent: true,
    //alphaMap: doorAlphaTexture,

    clearcoat: 1,
    clearcoatRoughness: 0,
})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), 
    material
)
sphere.position.x = -2

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), 
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.15, 64, 120),
    material
)
torus.position.x = 2

scene.add(sphere, plane, torus)

// --- Debug UI ---
const gui = new GUI({
    title: 'Material Controls'
})

const standardMaterial = gui.addFolder('Standard Material')
standardMaterial.add(material, 'roughness').min(0).max(1).step(0.001)
standardMaterial.add(material, 'metalness').min(0).max(1).step(0.001)

const physicalMaterial = gui.addFolder('Physical Material')
physicalMaterial.add(material, 'clearcoat').min(0).max(1).step(0.001)
physicalMaterial.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)

// --- Lights Setup ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff, 5)
scene.add(ambientLight, pointLight)

// --- Environment map ---
const rgbeLoader = new RGBELoader()
rgbeLoader.load('textures/environmentMap/2k.hdr', (environment) => {
    environment.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environment
    scene.environment = environment
})

// --- Camera Setup ---
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.z = 3
scene.add(camera)

// --- Controls ---
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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