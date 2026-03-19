import * as THREE from "three"
import gsap from "gsap"

// Variable para controlar que no se inicialice más de una vez
let gameInitialized = false

// Función principal de inicialización (se llamará desde el botón)
function initGame() {
  if (gameInitialized) return
  gameInitialized = true

  const canvas = document.querySelector("#character-canvas")
  if (!canvas) {
    console.error("Canvas #character-canvas no encontrado")
    return
  }

  // Asegurar que el canvas tiene dimensiones
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (width === 0 || height === 0) {
    console.warn("El canvas tiene dimensiones cero, se reintentará en el próximo frame")
    requestAnimationFrame(initGame)
    return
  }

  // ================= ESCENA =================
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x05070a)
  scene.fog = new THREE.Fog(0x05070a, 30, 200)

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(0, 8, 14)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  canvas.addEventListener('contextmenu', (e) => e.preventDefault())

  // ================= SKYBOX CON ESTRELLAS =================
  const skyGeo = new THREE.SphereGeometry(500, 32, 32)
  const skyMat = new THREE.MeshBasicMaterial({ color: 0x02030a, side: THREE.BackSide })
  const sky = new THREE.Mesh(skyGeo, skyMat)
  scene.add(sky)

  const starsGeo = new THREE.BufferGeometry()
  const starsCount = 800
  const starsPos = []
  for (let i = 0; i < starsCount; i++) {
    const r = 450 + Math.random() * 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    starsPos.push(x, y, z)
  }
  starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starsPos, 3))
  const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.8 })
  const stars = new THREE.Points(starsGeo, starsMat)
  scene.add(stars)
  gsap.to(starsMat, { opacity: 0.4, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" })

  // ================= LUCES =================
  const ambient = new THREE.AmbientLight(0x404060)
  scene.add(ambient)

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(30, 50, 30)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  dirLight.shadow.camera.near = 0.5
  dirLight.shadow.camera.far = 100
  dirLight.shadow.camera.left = -50
  dirLight.shadow.camera.right = 50
  dirLight.shadow.camera.top = 50
  dirLight.shadow.camera.bottom = -50
  scene.add(dirLight)

  const colors = [0xff00ff, 0x00ffff, 0xffff00, 0x00ff00]
  colors.forEach((color, i) => {
    const light = new THREE.PointLight(color, 1.5, 40)
    light.position.set(40 * Math.sin(i * Math.PI / 2), 10, 40 * Math.cos(i * Math.PI / 2))
    scene.add(light)
    gsap.to(light, { intensity: 0.5, duration: 1.5 + i * 0.2, repeat: -1, yoyo: true, ease: "sine.inOut" })
  })

  const neon = new THREE.PointLight(0xff00ff, 3, 25)
  scene.add(neon)
  gsap.to(neon, { intensity: 1, duration: 0.3, repeat: -1, yoyo: true })

  // ================= CALLES MEJORADAS =================
  const groundCanvas = document.createElement('canvas')
  groundCanvas.width = 512
  groundCanvas.height = 512
  const gCtx = groundCanvas.getContext('2d')
  gCtx.fillStyle = '#1a1a1a'
  gCtx.fillRect(0, 0, 512, 512)
  for (let i = 0; i < 5000; i++) {
    gCtx.fillStyle = `rgba(255,255,255,${Math.random()*0.1})`
    gCtx.fillRect(Math.floor(Math.random()*512), Math.floor(Math.random()*512), 2, 2)
  }
  const groundTexture = new THREE.CanvasTexture(groundCanvas)
  groundTexture.wrapS = THREE.RepeatWrapping
  groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set(20, 20)

  const groundMat = new THREE.MeshStandardMaterial({ map: groundTexture, color: 0xcccccc, roughness: 0.9, metalness: 0.1, emissive: 0x111122 })
  const groundGeo = new THREE.PlaneGeometry(500, 500)
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  function createRoadMarking(x, z, length, width, rotationY, dash = false, color = 0xffffff) {
    if (dash) {
      for (let offset = -length / 2 + 2; offset < length / 2; offset += 5) {
        const segment = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, width), new THREE.MeshStandardMaterial({ color, emissive: 0x333333 }))
        segment.position.set(x, 0.06, z)
        segment.rotation.y = rotationY
        if (rotationY === 0) segment.position.x = x + offset
        else segment.position.z = z + offset
        segment.receiveShadow = true
        scene.add(segment)
      }
    } else {
      const line = new THREE.Mesh(new THREE.BoxGeometry(length, 0.1, width), new THREE.MeshStandardMaterial({ color, emissive: 0x333333 }))
      line.position.set(x, 0.06, z)
      line.rotation.y = rotationY
      line.receiveShadow = true
      scene.add(line)
    }
  }

  const blockSize = 20
  const streetWidth = 10
  const totalSize = 200

  for (let i = -totalSize / 2; i <= totalSize / 2; i += blockSize + streetWidth) {
    createRoadMarking(0, i, totalSize, 0.5, 0, false, 0xffaa00)
    createRoadMarking(i, 0, 0.5, totalSize, 0, false, 0xffaa00)
  }

  const laneOffset = 3.5
  for (let i = -totalSize / 2; i <= totalSize / 2; i += blockSize + streetWidth) {
    createRoadMarking(laneOffset, i, totalSize, 0.3, 0, true, 0xffffff)
    createRoadMarking(-laneOffset, i, totalSize, 0.3, 0, true, 0xffffff)
    createRoadMarking(i, laneOffset, 0.3, totalSize, 0, true, 0xffffff)
    createRoadMarking(i, -laneOffset, 0.3, totalSize, 0, true, 0xffffff)
  }

  const manholeMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 })
  for (let i = 0; i < 15; i++) {
    const manhole = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.1, 8), manholeMat)
    manhole.rotation.x = Math.PI / 2
    manhole.position.set((Math.random() - 0.5) * 400, 0.1, (Math.random() - 0.5) * 400)
    manhole.receiveShadow = true
    manhole.castShadow = true
    scene.add(manhole)
  }

  // ================= VEREDAS =================
  function createSidewalk(x, z, length, width, rotationY) {
    const sideCanvas = document.createElement('canvas')
    sideCanvas.width = 128
    sideCanvas.height = 128
    const sCtx = sideCanvas.getContext('2d')
    sCtx.fillStyle = '#7a7a7a'
    sCtx.fillRect(0, 0, 128, 128)
    sCtx.strokeStyle = '#5a5a5a'
    sCtx.lineWidth = 1
    for (let i = 0; i < 128; i += 16) {
      sCtx.beginPath(); sCtx.moveTo(i, 0); sCtx.lineTo(i, 128); sCtx.stroke()
      sCtx.beginPath(); sCtx.moveTo(0, i); sCtx.lineTo(128, i); sCtx.stroke()
    }
    const sideTexture = new THREE.CanvasTexture(sideCanvas)
    sideTexture.wrapS = THREE.RepeatWrapping
    sideTexture.wrapT = THREE.RepeatWrapping
    sideTexture.repeat.set(length / 4, width / 4)

    const sidewalkMat = new THREE.MeshStandardMaterial({ map: sideTexture, roughness: 0.9 })
    const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(length, 0.2, width), sidewalkMat)
    sidewalk.position.set(x, 0.15, z)
    sidewalk.rotation.y = rotationY
    sidewalk.receiveShadow = true
    sidewalk.castShadow = true
    scene.add(sidewalk)

    const curbMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.5 })
    if (rotationY === 0) {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(length, 0.3, 0.2), curbMat)
      curb.position.set(x, 0.25, z + (width / 2 - 0.1))
      curb.receiveShadow = true; curb.castShadow = true; scene.add(curb)
      const curb2 = new THREE.Mesh(new THREE.BoxGeometry(length, 0.3, 0.2), curbMat)
      curb2.position.set(x, 0.25, z - (width / 2 - 0.1))
      curb2.receiveShadow = true; curb2.castShadow = true; scene.add(curb2)
    } else {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, width), curbMat)
      curb.position.set(x + (length / 2 - 0.1), 0.25, z)
      curb.receiveShadow = true; curb.castShadow = true; scene.add(curb)
      const curb2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, width), curbMat)
      curb2.position.set(x - (length / 2 - 0.1), 0.25, z)
      curb2.receiveShadow = true; curb2.castShadow = true; scene.add(curb2)
    }
  }

  for (let i = -totalSize / 2; i <= totalSize / 2; i += blockSize + streetWidth) {
    createSidewalk(0, i - streetWidth / 2 + 0.5, totalSize, 1, 0)
    createSidewalk(0, i + streetWidth / 2 - 0.5, totalSize, 1, 0)
    createSidewalk(i - streetWidth / 2 + 0.5, 0, 1, totalSize, 0)
    createSidewalk(i + streetWidth / 2 - 0.5, 0, 1, totalSize, 0)
  }

  // ================= ELEMENTOS DEL VECINDARIO (farolas y árboles) =================
  function createStreetLight(x, z) {
    const group = new THREE.Group()
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 })
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xffdd99, emissive: 0xffaa33, emissiveIntensity: 2 })

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4), poleMat)
    pole.position.y = 2; pole.castShadow = true; pole.receiveShadow = true; group.add(pole)

    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.2), poleMat)
    arm.position.set(0.7, 3.5, 0); arm.castShadow = true; arm.receiveShadow = true; group.add(arm)

    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 6), lampMat)
    lamp.position.set(1.5, 3.5, 0); lamp.castShadow = true; lamp.receiveShadow = true; group.add(lamp)

    group.position.set(x, 0, z)
    scene.add(group)

    const light = new THREE.PointLight(0xffaa33, 2, 10)
    light.position.set(x + 1.5, 3.5, z)
    scene.add(light)
  }

  function createTree(x, z) {
    const group = new THREE.Group()
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B })
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x2E7D32 })

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 2), trunkMat)
    trunk.position.y = 1; trunk.castShadow = true; trunk.receiveShadow = true; group.add(trunk)

    const leaves1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 6), leavesMat)
    leaves1.position.y = 2.5; leaves1.castShadow = true; leaves1.receiveShadow = true; group.add(leaves1)

    const leaves2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 6), leavesMat)
    leaves2.position.y = 3.5; leaves2.castShadow = true; leaves2.receiveShadow = true; group.add(leaves2)

    group.position.set(x, 0, z)
    scene.add(group)
  }

  for (let i = -totalSize / 2 + blockSize/2; i < totalSize / 2; i += blockSize + streetWidth) {
    for (let j = -totalSize / 2 + blockSize/2; j < totalSize / 2; j += blockSize + streetWidth) {
      const x = i - blockSize/2 - streetWidth/2 + 1
      const z = j - blockSize/2 - streetWidth/2 + 1
      if (Math.random() > 0.5) createStreetLight(x, z)
      else createTree(x, z)
    }
  }

  // ================= EDIFICIOS =================
  const buildingColliders = []

  function createBuilding(x, z) {
    const height = 5 + Math.random() * 20
    let color
    const rand = Math.random()
    if (rand < 0.6) color = new THREE.Color().setHSL(0, 0, 0.2 + Math.random() * 0.4)
    else if (rand < 0.8) color = new THREE.Color().setHSL(0.6, 0.2, 0.3 + Math.random() * 0.3)
    else color = new THREE.Color().setHSL(0.1, 0.2, 0.3 + Math.random() * 0.3)

    const material = new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(0x111122), roughness: 0.4 + Math.random() * 0.4, metalness: 0.1 + Math.random() * 0.3 })
    const building = new THREE.Mesh(new THREE.BoxGeometry(6, height, 6), material)
    building.position.set(x, height / 2, z)
    building.castShadow = true
    building.receiveShadow = true
    scene.add(building)

    buildingColliders.push({
      minX: x - 3, maxX: x + 3,
      minZ: z - 3, maxZ: z + 3
    })

    // Ventanas (reducidas)
    const windowMat = new THREE.MeshStandardMaterial({ color: 0xffaa33, emissive: 0x442200, emissiveIntensity: 1.2 })
    const windowCount = Math.floor(height / 3)
    for (let i = 0; i < windowCount; i++) {
      const windowY = 1.2 + i * 2.0
      for (let face = 0; face < 2; face++) {
        const angle = face * Math.PI
        const wx = x + 3.1 * Math.cos(angle)
        const wz = z + 3.1 * Math.sin(angle)
        const windowBox = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.2), windowMat)
        windowBox.position.set(wx, windowY, wz)
        windowBox.castShadow = true
        scene.add(windowBox)
      }
    }
  }

  const blocksPerSide = 5
  const offset = (blocksPerSide * (blockSize + streetWidth)) / 2 - streetWidth / 2

  for (let i = 0; i < blocksPerSide; i++) {
    for (let j = 0; j < blocksPerSide; j++) {
      const centerX = -offset + i * (blockSize + streetWidth) + blockSize / 2
      const centerZ = -offset + j * (blockSize + streetWidth) + blockSize / 2
      const buildingsPerBlock = 2 + Math.floor(Math.random() * 2)
      for (let k = 0; k < buildingsPerBlock; k++) {
        const x = centerX + (Math.random() - 0.5) * (blockSize - 8)
        const z = centerZ + (Math.random() - 0.5) * (blockSize - 8)
        createBuilding(x, z)
      }
    }
  }

  // ================= PERSONAJE =================
  const character = new THREE.Group()

  const matBody = new THREE.MeshStandardMaterial({ color: 0x444444, emissive: 0x111122 })
  const matHead = new THREE.MeshStandardMaterial({ color: 0xc8a68f })

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.5), matBody)
  torso.position.y = 1; torso.castShadow = true; torso.receiveShadow = true; character.add(torso)

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), matHead)
  head.position.y = 1.9; head.castShadow = true; head.receiveShadow = true; character.add(head)

  const armGeo = new THREE.BoxGeometry(0.25, 0.9, 0.25)
  const leftArm = new THREE.Mesh(armGeo, matBody)
  leftArm.position.set(-0.6, 1, 0); leftArm.castShadow = true; leftArm.receiveShadow = true; character.add(leftArm)
  const rightArm = new THREE.Mesh(armGeo, matBody)
  rightArm.position.set(0.6, 1, 0); rightArm.castShadow = true; rightArm.receiveShadow = true; character.add(rightArm)

  const legGeo = new THREE.BoxGeometry(0.3, 1.1, 0.3)
  const leftLeg = new THREE.Mesh(legGeo, matBody)
  leftLeg.position.set(-0.2, 0, 0); leftLeg.castShadow = true; leftLeg.receiveShadow = true; character.add(leftLeg)
  const rightLeg = new THREE.Mesh(legGeo, matBody)
  rightLeg.position.set(0.2, 0, 0); rightLeg.castShadow = true; rightLeg.receiveShadow = true; character.add(rightLeg)

  // Función para verificar si una posición es válida (no colisiona con edificios)
  function isValidSpawn(x, z, radius = 0.8) {
    for (let coll of buildingColliders) {
      if (x + radius > coll.minX && x - radius < coll.maxX && z + radius > coll.minZ && z - radius < coll.maxZ) {
        return false
      }
    }
    return true
  }

  // Buscar una posición de spawn válida en las calles
  let spawnX, spawnZ
  const streetPositions = []
  for (let i = -totalSize/2 + streetWidth/2; i < totalSize/2; i += blockSize + streetWidth) {
    for (let j = -totalSize/2 + streetWidth/2; j < totalSize/2; j += blockSize + streetWidth) {
      streetPositions.push({ x: i, z: j })
    }
  }
  do {
    const pos = streetPositions[Math.floor(Math.random() * streetPositions.length)]
    spawnX = pos.x
    spawnZ = pos.z
  } while (!isValidSpawn(spawnX, spawnZ))
  character.position.set(spawnX, 0, spawnZ)

  scene.add(character)

  // ================= NPCs =================
  function createNPC(x, z) {
    const npc = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888, emissive: 0x111111 })
    const headMat = new THREE.MeshStandardMaterial({ color: 0xc8a68f })

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.5), bodyMat)
    body.position.y = 0.8; body.castShadow = true; body.receiveShadow = true; npc.add(body)

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), headMat)
    head.position.y = 1.6; head.castShadow = true; head.receiveShadow = true; npc.add(head)

    const legMat = new THREE.MeshStandardMaterial({ color: 0x666666 })
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.8, 0.25), legMat)
    leftLeg.position.set(-0.2, 0.4, 0); leftLeg.castShadow = true; leftLeg.receiveShadow = true; npc.add(leftLeg)
    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.8, 0.25), legMat)
    rightLeg.position.set(0.2, 0.4, 0); rightLeg.castShadow = true; rightLeg.receiveShadow = true; npc.add(rightLeg)

    npc.position.set(x, 0, z)
    npc.userData = {
      direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
      speed: 0.8 + Math.random() * 1.5,
      walkTime: Math.random() * 10,
      legs: [leftLeg, rightLeg]
    }
    scene.add(npc)
    return npc
  }

  const npcs = []
  for (let i = 0; i < 4; i++) {
    let x, z
    do {
      x = (Math.random() - 0.5) * 150
      z = (Math.random() - 0.5) * 150
    } while (!isValidSpawn(x, z, 0.5))
    npcs.push(createNPC(x, z))
  }

  // ================= AUTOS =================
  const carPositions = [] // para guardar los carriles (calles horizontales)
  for (let z = -totalSize/2 + streetWidth/2; z < totalSize/2; z += blockSize + streetWidth) {
    carPositions.push({ z, minX: -totalSize/2, maxX: totalSize/2 })
  }

  function createCar() {
    const car = new THREE.Group()
    const colors = [0xff3333, 0x33ff33, 0x3333ff, 0xffff33]
    const bodyMat = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], emissive: 0x110000 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(2, 0.6, 1), bodyMat)
    body.position.y = 0.3; body.castShadow = true; body.receiveShadow = true; car.add(body)

    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x444444 })
    const leftLight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2), lightMat)
    leftLight.position.set(0.8, 0.4, 0.3); car.add(leftLight)
    const rightLight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2), lightMat)
    rightLight.position.set(0.8, 0.4, -0.3); car.add(rightLight)

    const brakeMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x330000 })
    const leftBrake = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2), brakeMat)
    leftBrake.position.set(-0.8, 0.4, 0.3); car.add(leftBrake)
    const rightBrake = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2), brakeMat)
    rightBrake.position.set(-0.8, 0.4, -0.3); car.add(rightBrake)

    const roofMat = new THREE.MeshStandardMaterial({ color: 0x222222 })
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.8), roofMat)
    roof.position.set(0, 0.8, 0); roof.castShadow = true; roof.receiveShadow = true; car.add(roof)

    const lane = carPositions[Math.floor(Math.random() * carPositions.length)]
    const startX = lane.minX + 10
    car.position.set(startX, 0.3, lane.z)
    car.userData = { lane: lane.z, direction: 1, speed: 5 + Math.random() * 3 }
    scene.add(car)
    return car
  }

  const cars = []
  for (let i = 0; i < 4; i++) cars.push(createCar())

  // ================= PROYECTOS =================
  const projects = [
    { name: "Plugin WordPress", desc: "Plugin avanzado de ventas", url: "https://tusitio.com/plugin", pos: new THREE.Vector3(30, 0, -30) },
    { name: "Juego ThreeJS", desc: "Experimento 3D web", url: "https://tusitio.com/juego", pos: new THREE.Vector3(-40, 0, 20) },
    { name: "SaaS Dashboard", desc: "Panel administrativo completo", url: "https://tusitio.com/saas", pos: new THREE.Vector3(20, 0, 50) }
  ]

  const projectMeshes = []
  projects.forEach(p => {
    const screen = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.2), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x00ffff, emissiveIntensity: 0.7 }))
    screen.position.copy(p.pos)
    screen.position.y = 2
    screen.castShadow = true
    screen.receiveShadow = true
    scene.add(screen)
    projectMeshes.push({ mesh: screen, data: p })
    gsap.to(screen.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: "none" })
  })

  // ================= LLUVIA (reducida) =================
  const rainGeo = new THREE.BufferGeometry()
  const rainCount = 1000
  const rainPos = []
  for (let i = 0; i < rainCount; i++) {
    rainPos.push((Math.random() - 0.5) * 600, Math.random() * 150, (Math.random() - 0.5) * 600)
  }
  rainGeo.setAttribute("position", new THREE.Float32BufferAttribute(rainPos, 3))

  const rainCanvas = document.createElement("canvas")
  rainCanvas.width = 8
  rainCanvas.height = 8
  const ctx = rainCanvas.getContext("2d")
  ctx.fillStyle = "#aaa"
  ctx.fillRect(0, 0, 8, 8)
  ctx.fillStyle = "#fff"
  ctx.fillRect(3, 0, 2, 8)
  const texture = new THREE.CanvasTexture(rainCanvas)

  const rainMat = new THREE.PointsMaterial({ color: 0xaaaaaa, map: texture, size: 0.3, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  const rain = new THREE.Points(rainGeo, rainMat)
  scene.add(rain)

  // ================= MARCADOR DE DESTINO =================
  const markerGeo = new THREE.RingGeometry(0.5, 1, 16)
  const markerMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x004444, side: THREE.DoubleSide })
  const marker = new THREE.Mesh(markerGeo, markerMat)
  marker.rotation.x = -Math.PI / 2
  marker.position.y = 0.02
  marker.visible = false
  scene.add(marker)

  // ================= UI =================
  const ui = document.createElement("div")
  ui.style.position = "fixed"
  ui.style.bottom = "40px"
  ui.style.left = "50%"
  ui.style.transform = "translateX(-50%)"
  ui.style.background = "rgba(0,0,0,0.7)"
  ui.style.padding = "15px 25px"
  ui.style.color = "white"
  ui.style.fontFamily = "sans-serif"
  ui.style.display = "none"
  ui.style.borderRadius = "10px"
  ui.style.border = "1px solid #00ffff"
  ui.style.cursor = "pointer"
  ui.style.zIndex = "1000"
  ui.style.textAlign = "center"
  ui.style.backdropFilter = "blur(5px)"
  document.body.appendChild(ui)

  let currentProject = null
  ui.addEventListener("click", () => { if (currentProject && currentProject.url) window.open(currentProject.url, "_blank") })

  // ================= CONTROLES =================
  const keys = {}
  window.addEventListener("keydown", e => keys[e.code] = true)
  window.addEventListener("keyup", e => keys[e.code] = false)

  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  let moveTarget = null

  function handleClick(event) {
    event.preventDefault()
    const rect = canvas.getBoundingClientRect()
    let clientX, clientY
    if (event.touches) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const targetPoint = new THREE.Vector3()
    if (raycaster.ray.intersectPlane(plane, targetPoint)) {
      moveTarget = { x: targetPoint.x, z: targetPoint.z }
      marker.position.x = targetPoint.x
      marker.position.z = targetPoint.z
      marker.visible = true
    }
  }
  canvas.addEventListener("click", handleClick)
  canvas.addEventListener("touchstart", handleClick, { passive: false })

  let isDragging = false
  let lastMouseX = 0, lastMouseY = 0
  let cameraAngleX = 0, cameraAngleY = 0.5

  function handleDragStart(event) {
    event.preventDefault()
    isDragging = true
    if (event.touches) {
      lastMouseX = event.touches[0].clientX
      lastMouseY = event.touches[0].clientY
    } else {
      lastMouseX = event.clientX
      lastMouseY = event.clientY
    }
  }
  function handleDragMove(event) {
    if (!isDragging) return
    event.preventDefault()
    let clientX, clientY
    if (event.touches) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }
    const deltaX = clientX - lastMouseX
    const deltaY = clientY - lastMouseY
    cameraAngleX += deltaX * 0.01
    cameraAngleY += deltaY * 0.01
    cameraAngleY = Math.max(0.2, Math.min(1.2, cameraAngleY))
    lastMouseX = clientX
    lastMouseY = clientY
  }
  function handleDragEnd(event) {
    event.preventDefault()
    isDragging = false
  }
  canvas.addEventListener("mousedown", handleDragStart)
  canvas.addEventListener("mousemove", handleDragMove)
  canvas.addEventListener("mouseup", handleDragEnd)
  canvas.addEventListener("mouseleave", handleDragEnd)
  canvas.addEventListener("touchstart", handleDragStart, { passive: false })
  canvas.addEventListener("touchmove", handleDragMove, { passive: false })
  canvas.addEventListener("touchend", handleDragEnd)
  canvas.addEventListener("touchcancel", handleDragEnd)

  function checkCollision(newPos, radius = 0.5) {
    for (let coll of buildingColliders) {
      if (newPos.x + radius > coll.minX && newPos.x - radius < coll.maxX &&
          newPos.z + radius > coll.minZ && newPos.z - radius < coll.maxZ) {
        return true
      }
    }
    return false
  }

  // ================= ANIMACIONES =================
  let walkTime = 0
  function animateCharacter(delta, moving) {
    if (moving) {
      walkTime += delta * 8
      const swing = Math.sin(walkTime) * 0.7
      leftArm.rotation.x = swing
      rightArm.rotation.x = -swing
      leftLeg.rotation.x = -swing
      rightLeg.rotation.x = swing
    } else {
      walkTime += delta
      torso.position.y = 1 + Math.sin(walkTime * 2) * 0.03
    }
  }

  function animateNPCs(delta) {
    npcs.forEach(npc => {
      let newX = npc.position.x + npc.userData.direction.x * npc.userData.speed * delta
      let newZ = npc.position.z + npc.userData.direction.z * npc.userData.speed * delta
      if (!checkCollision(new THREE.Vector3(newX, 0, newZ), 0.4)) {
        npc.position.x = newX
        npc.position.z = newZ
      } else {
        npc.userData.direction.x = (Math.random() - 0.5) * 2
        npc.userData.direction.z = (Math.random() - 0.5) * 2
        npc.userData.direction.normalize()
      }
      if (Math.abs(npc.position.x) > 90 || Math.abs(npc.position.z) > 90) {
        npc.userData.direction.x *= -1
        npc.userData.direction.z *= -1
      }
      const targetRot = Math.atan2(npc.userData.direction.x, npc.userData.direction.z)
      npc.rotation.y = targetRot
      npc.userData.walkTime += delta * 5
      const swing = Math.sin(npc.userData.walkTime) * 0.5
      npc.userData.legs[0].rotation.x = swing
      npc.userData.legs[1].rotation.x = -swing
    })
  }

  // ================= LOOP PRINCIPAL =================
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)

    const delta = Math.min(clock.getDelta(), 0.1)

    // Movimiento del personaje
    let move = new THREE.Vector3()
    if (keys["KeyW"]) move.z -= 1
    if (keys["KeyS"]) move.z += 1
    if (keys["KeyA"]) move.x -= 1
    if (keys["KeyD"]) move.x += 1

    if (moveTarget) {
      const dx = moveTarget.x - character.position.x
      const dz = moveTarget.z - character.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist > 0.5) {
        const direction = new THREE.Vector3(dx, 0, dz).normalize()
        const speed = 8 * delta
        const newX = character.position.x + direction.x * speed
        const newZ = character.position.z + direction.z * speed
        if (!checkCollision(new THREE.Vector3(newX, 0, newZ), 0.5)) {
          character.position.x = newX
          character.position.z = newZ
        }
        const targetRot = Math.atan2(direction.x, direction.z)
        character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, targetRot, 0.15)
        move.set(direction.x, 0, direction.z)
      } else {
        moveTarget = null
        marker.visible = false
      }
    }

    const moving = move.length() > 0 || (moveTarget !== null)
    const running = keys["ShiftLeft"] && move.length() > 0

    if (move.length() > 0) {
      move.normalize()
      const velocity = (running ? 16 : 8) * delta
      const newX = character.position.x + move.x * velocity
      const newZ = character.position.z + move.z * velocity
      if (!checkCollision(new THREE.Vector3(newX, 0, newZ), 0.5)) {
        character.position.x = newX
        character.position.z = newZ
      }
      const targetRot = Math.atan2(move.x, move.z)
      character.rotation.y = THREE.MathUtils.lerp(character.rotation.y, targetRot, 0.15)
    }

    animateCharacter(delta, moving)
    animateNPCs(delta)

    // Autos
    cars.forEach(car => {
      car.position.x += car.userData.speed * delta * car.userData.direction
      if (car.position.x > 200 || car.position.x < -200) {
        car.userData.direction *= -1
      }
    })

    // Lluvia
    const positions = rain.geometry.attributes.position.array
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= 0.8 * delta * 60
      if (positions[i] < 0) {
        positions[i] = 150
        positions[i - 1] = (Math.random() - 0.5) * 600
        positions[i + 1] = (Math.random() - 0.5) * 600
      }
    }
    rain.geometry.attributes.position.needsUpdate = true

    // Detección de proyectos
    let found = null
    projectMeshes.forEach(p => {
      const dist = character.position.distanceTo(p.mesh.position)
      if (dist < 5) {
        p.mesh.material.emissiveIntensity = 3
        found = p.data
      } else {
        p.mesh.material.emissiveIntensity = 0.7
      }
    })

    if (found) {
      ui.style.display = "block"
      ui.innerHTML = `<b>${found.name}</b><br>${found.desc}<br><small>Click para abrir</small>`
      currentProject = found
    } else {
      ui.style.display = "none"
      currentProject = null
    }

    // Cámara
    const distance = 18
    const height = 8
    const camX = character.position.x + distance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY)
    const camY = character.position.y + height + distance * Math.sin(cameraAngleY)
    const camZ = character.position.z + distance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY)
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.1)
    camera.lookAt(character.position)
    neon.position.copy(character.position).add(new THREE.Vector3(0, 2, 0))

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  })
}

// Exponer la función de inicio globalmente
window.startGame = initGame