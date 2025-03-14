import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

// DOM Elements
const canvas = document.getElementById('canvas');
const loadingElement = document.getElementById('loading');
const resetCameraButton = document.getElementById('reset-camera');
const toggleRotationButton = document.getElementById('toggle-rotation');

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue background

// Camera setup
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Model loading
let castle;
let isRotating = false;
const loader = new GLTFLoader();

console.log('Starting to load castle model...');
loadingElement.textContent = 'Starting to load castle model...';

// Add a simple cube as a placeholder while loading
const placeholderGeometry = new THREE.BoxGeometry(1, 1, 1);
const placeholderMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const placeholder = new THREE.Mesh(placeholderGeometry, placeholderMaterial);
scene.add(placeholder);

// Try loading the simple castle model first
loader.load(
    'models/simple_castle.glb',
    (gltf) => {
        console.log('Simple castle model loaded successfully!');
        castle = gltf.scene;
        
        // Apply shadows to all meshes in the model
        castle.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
        // Center the model
        const box = new THREE.Box3().setFromObject(castle);
        const center = box.getCenter(new THREE.Vector3());
        castle.position.x -= center.x;
        castle.position.z -= center.z;
        
        // Add the model to the scene
        scene.add(castle);
        
        // Remove placeholder
        scene.remove(placeholder);
        
        // Hide loading screen
        loadingElement.style.display = 'none';
    },
    (xhr) => {
        // Loading progress
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`Loading progress: ${Math.round(percentComplete)}%`);
        loadingElement.textContent = `Loading: ${Math.round(percentComplete)}%`;
    },
    (error) => {
        console.error('Error loading simple castle model:', error);
        console.error('Error details:', JSON.stringify(error));
        loadingElement.textContent = 'Error loading model. Please check console for details.';
        
        // Fallback to test cube if simple castle fails
        loader.load(
            'models/test_cube.glb',
            (gltf) => {
                console.log('Fallback to test cube successful!');
                castle = gltf.scene;
                scene.add(castle);
                scene.remove(placeholder);
                loadingElement.style.display = 'none';
            },
            null,
            (error) => {
                console.error('Error loading fallback model:', error);
                loadingElement.textContent = 'All model loading attempts failed.';
            }
        );
    }
);

// Add a ground plane
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.1;
ground.receiveShadow = true;
scene.add(ground);

// Event listeners
resetCameraButton.addEventListener('click', () => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    controls.update();
});

toggleRotationButton.addEventListener('click', () => {
    isRotating = !isRotating;
    toggleRotationButton.textContent = isRotating ? 'Stop Rotation' : 'Toggle Rotation';
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    controls.update();
    
    // Rotate the castle if enabled
    if (castle && isRotating) {
        castle.rotation.y += 0.005;
    } else if (placeholder) {
        // Rotate placeholder while waiting
        placeholder.rotation.y += 0.01;
    }
    
    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate(); 