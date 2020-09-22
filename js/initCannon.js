// Cannon.js
let world
let physicsMaterial
let groundBody
let sphereShape = new CANNON.Sphere(0.5)
let playerBody
const dt = 1.0 / 60.0 // seconds
let time = Date.now()
let cannonDebugRenderer


function initCannon() {
    // 初始化 cannon.js、重力、碰撞偵測
    world = new CANNON.World()
    world.gravity.set(0, -2000, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
  
    // 解算器設定
    const solver = new CANNON.GSSolver()
    solver.iterations = 7
    solver.tolerance = 0.1
    const split = false
    if (split) world.solver = new CANNON.SplitSolver(solver)
    else world.solver = solver
  
    // 接觸材質相關設定（摩擦力、恢復係數）
    world.defaultContactMaterial.contactEquationStiffness = 1e9
    world.defaultContactMaterial.contactEquationRelaxation = 4
    physicsMaterial = new CANNON.Material('slipperyMaterial')
    const physicsContactMaterial = new CANNON.ContactMaterial(
      physicsMaterial,
      physicsMaterial,
      0.0,
      0.3
    )
    world.addContactMaterial(physicsContactMaterial)
  
    // 鼠標控制器剛體
    // const playerShapeVec3 = new CANNON.Vec3(1, 1, 1)
    // const playerShape = new CANNON.Box(playerShapeVec3)
    playerBody = new CANNON.Body({ mass: 500 })
    playerBody.addShape(sphereShape)
    playerBody.position.set(10, 300, 10)
    playerBody.linearDamping = 0.9
    world.addBody(playerBody)
    console.log(playerBody)
    // cannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world)
  }
  