import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height;
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh2 = new THREE.Mesh(geometry, material2);
scene.add(mesh2);
scene.add(mesh);

mesh2.position.set(1, 1, -1);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Resize Event
window.addEventListener("resize", () => {
  console.log("resize");

  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* Listener to fullScreen */

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.001,
  99999
);
/* const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -2 * aspectRatio,
  2 * aspectRatio,
  2,
  -2,
  0.1,
  100
  ); */

camera.position.z = 7;
camera.lookAt(mesh.position);
scene.add(camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

// Animations
const animationLoop = () => {
  /* in some cases you may have frames difference to gap that you may use a timestap to get in line */

  //Time delta time

  const elapsedTime = clock.getElapsedTime();

  //Update controls
  controls.update();

  // Render the animation on each loop cicle
  renderer.render(scene, camera);

  window.requestAnimationFrame(animationLoop);
};

animationLoop();
