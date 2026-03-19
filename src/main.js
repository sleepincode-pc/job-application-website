import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./game.js";

gsap.registerPlugin(ScrollTrigger);

// ================= FONDO 3D (ESTRELLAS) =================
const canvas = document.querySelector("#bg");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
scene.fog = new THREE.Fog(0x0a0a0a, 15, 80);

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 18);

const renderer = new THREE.WebGLRenderer({
  canvas,
  powerPreference: "high-performance",
  antialias: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const pointLight = new THREE.PointLight(0xffffff, 0.4, 50);
pointLight.position.set(5, 8, 10);
scene.add(pointLight);

// Estrellas
function createStars(count, spread, size, opacity) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = spread * Math.pow(Math.random(), 0.6);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = radius * Math.cos(phi);
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size,
    color: 0xffffff,
    transparent: true,
    opacity,
    depthWrite: false
  });
  return new THREE.Points(geometry, material);
}

const starsFar = createStars(1200, 500, 0.02, 0.25);
const starsMid = createStars(800, 300, 0.03, 0.45);
const starsNear = createStars(400, 180, 0.05, 0.8);
scene.add(starsFar, starsMid, starsNear);
const dust = createStars(400, 200, 0.015, 0.15);
scene.add(dust);

// Nebulosa
function createNebula() {
  const geometry = new THREE.SphereGeometry(25, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.015,
    side: THREE.BackSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -30;
  return mesh;
}
const nebula = createNebula();
scene.add(nebula);

// Overlay
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "10";
overlay.style.backgroundImage = `
  radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.75)),
  repeating-linear-gradient(
    0deg,
    rgba(255,255,255,0.02) 0px,
    rgba(0,0,0,0.02) 2px,
    transparent 4px
  )
`;
overlay.style.mixBlendMode = "overlay";
overlay.style.opacity = "0.6";
document.body.appendChild(overlay);

// Parallax mouse
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animación fondo
let lastTime = 0, fps = 60;
function animateBackground(time) {
  requestAnimationFrame(animateBackground);
  const delta = time - lastTime;
  if (delta < 1000 / fps) return;
  lastTime = time;

  mouseX += (targetX - mouseX) * 0.04;
  mouseY += (targetY - mouseY) * 0.04;

  camera.position.x = mouseX * 1.5;
  camera.position.y = -mouseY * 0.8 + 1;
  camera.lookAt(0, 0, -5);

  starsFar.rotation.y += 0.00002;
  starsMid.rotation.y += 0.00005;
  starsNear.rotation.y += 0.0001;
  dust.rotation.y += 0.00015;

  const t = time * 0.001;
  starsNear.material.opacity = 0.75 + Math.sin(t * 2) * 0.1;
  starsMid.material.opacity = 0.45 + Math.sin(t * 1.5) * 0.05;

  nebula.rotation.y += 0.00005;
  nebula.material.opacity = 0.012 + Math.sin(time * 0.0003) * 0.005;

  renderer.render(scene, camera);
}
animateBackground();

// Resize fondo
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================= AVATAR 3D (MONEDA) CON perfil-pic.jpg =================
function initAvatarCoin() {
  const container = document.getElementById('logo3D');
  if (!container) return;

  const oldCanvas = document.getElementById('avatar-canvas');
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'avatar-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.borderRadius = '50%';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '2';
  container.appendChild(canvas);

  const imgUrl = './perfil-pic.jpg';

  const sceneCoin = new THREE.Scene();
  sceneCoin.background = null;

  const cameraCoin = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  cameraCoin.position.set(0, 0, 3);

  const rendererCoin = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });

  const resizeCanvas = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    rendererCoin.setSize(width, height, false);
    cameraCoin.aspect = width / height;
    cameraCoin.updateProjectionMatrix();
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  sceneCoin.add(ambientLight);
  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 1, 2);
  sceneCoin.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(-1, -0.5, 1);
  sceneCoin.add(light2);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    imgUrl,
    (texture) => {
      // Crear un canvas para redimensionar la imagen a un cuadrado
      const img = texture.image;
      const size = Math.max(img.width, img.height);
      const canvasTemp = document.createElement('canvas');
      canvasTemp.width = size;
      canvasTemp.height = size;
      const ctx = canvasTemp.getContext('2d');
      // Dibujar la imagen centrada y escalada para cubrir el cuadrado (efecto cover)
      const scale = size / Math.min(img.width, img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      // Crear nueva textura desde el canvas
      const squareTexture = new THREE.CanvasTexture(canvasTemp);
      squareTexture.minFilter = THREE.LinearFilter;
      squareTexture.magFilter = THREE.LinearFilter;
      squareTexture.wrapS = THREE.ClampToEdgeWrapping;
      squareTexture.wrapT = THREE.ClampToEdgeWrapping;

      const coinGroup = new THREE.Group();
      const radius = 1;
      const thickness = 0.1;
      const offset = 0.01;
      const segments = 64;

      const faceMaterial = new THREE.MeshBasicMaterial({
        map: squareTexture,
        side: THREE.FrontSide
      });

      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        emissive: 0x111111,
        roughness: 0.4,
        metalness: 0.7
      });

      const frontGeo = new THREE.CircleGeometry(radius, segments);
      const front = new THREE.Mesh(frontGeo, faceMaterial);
      front.position.z = thickness / 2 + offset;
      coinGroup.add(front);

      const backGeo = new THREE.CircleGeometry(radius, segments);
      const back = new THREE.Mesh(backGeo, faceMaterial);
      back.position.z = -thickness / 2 - offset;
      back.rotation.y = Math.PI;
      coinGroup.add(back);

      const edgeGeo = new THREE.CylinderGeometry(radius, radius, thickness, segments);
      const edge = new THREE.Mesh(edgeGeo, edgeMaterial);
      edge.rotation.x = Math.PI / 2;
      edge.position.z = 0;
      coinGroup.add(edge);

      sceneCoin.add(coinGroup);

      function animateCoin() {
        requestAnimationFrame(animateCoin);
        coinGroup.rotation.y += 0.008;
        rendererCoin.render(sceneCoin, cameraCoin);
      }
      animateCoin();
    },
    undefined,
    (err) => {
      console.error('Error al cargar la textura:', err);
      // Fallback con color sólido
      const coinGroup = new THREE.Group();
      const radius = 1;
      const thickness = 0.1;
      const offset = 0.01;
      const segments = 32;
      const material = new THREE.MeshStandardMaterial({ color: 0x3366cc });

      const front = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
      front.position.z = thickness/2 + offset;
      coinGroup.add(front);

      const back = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
      back.position.z = -thickness/2 - offset;
      back.rotation.y = Math.PI;
      coinGroup.add(back);

      const edge = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thickness, segments), material);
      edge.rotation.x = Math.PI/2;
      edge.position.z = 0;
      coinGroup.add(edge);

      sceneCoin.add(coinGroup);

      function animateFallback() {
        requestAnimationFrame(animateFallback);
        coinGroup.rotation.y += 0.01;
        rendererCoin.render(sceneCoin, cameraCoin);
      }
      animateFallback();
    }
  );
}

// Iniciar avatar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAvatarCoin);