let container, controls;
let camera, scene, renderer, light;

const textureLoader = new THREE.TextureLoader()

const clock = new THREE.Clock();
const inputBox = document.getElementById('number')

let binaryBoxes;
let value = 0;

init();
animate();

function init() {

    container = document.getElementById('animation');

    scene = new THREE.Scene();

    cameraInit();
    lightsInit();

    // createGround();
    createSkyBox();

    initBoxes(scene);
    initCircuit(scene);
    initDice();

    createRenderer();
    createControls();

    // const axesHelper = new THREE.AxesHelper(500);
    // scene.add(axesHelper);
}


function animate() {

    requestAnimationFrame(animate);

    updateCircuit();
    updateDice();

    const enteredValue = inputBox.value

    if (enteredValue != value) {
        setValueBoxes(enteredValue);
        value = enteredValue;
        setValueCircuit(value);
    }
    renderer.render(scene, camera);

    // console.log(camera);
}

function cameraInit() {

    // var aspect = window.innerWidth / window.innerHeight;
    // var d = 50;
    // camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

    // camera.position.set( 20, 20, 20 ); // all components equal
    // camera.lookAt( 0, 0, 0); // or the origin


    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(-139, 174, -50);
    camera.rotation.set(-2.72, -1, -2.77);
}

function lightsInit() {
    // light = new THREE.HemisphereLight(0xffffff, 0x444444);
    // light.position.set(0, 200, 0);
    // light.intensity = .5
    // scene.add(light);


    light = new THREE.AmbientLight(0x444444);
    light.intensity = .7
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = - 100;
    light.shadow.camera.left = - 120;
    light.shadow.camera.right = 120;
    scene.add(light);
}

function createGround() {
    const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 512), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: true }));
    mesh.receiveShadow = true;
    mesh.position.z = - Math.PI / 2;
    mesh.position.x = - Math.PI / 2;
    // mesh.position.y -= 50;

    const texture = textureLoader.load("textures/CircuitBoard_512_albedo.png");
    const normalTexture = textureLoader.load("textures/metal-floor.jpg");
    mesh.material.map = texture;
    mesh.material.normalMap = normalTexture;

    scene.add(mesh)
}

function createSkyBox() {

    let size = 512
    let skyGeometry = new THREE.CubeGeometry(size, size / 2, size);

    let materialArray = [];
    for (let j = 0; j < 6; j++)
        materialArray.push(new THREE.MeshPhongMaterial({
            map: textureLoader.load("./textures/Scifi_Panel8_512_albedo.png"),
            // normalMap: THREE.ImageUtils.loadTexture("textures/Scifi_Panel8_512_normal.png"),
            side: THREE.BackSide,
        }));

    var skyBox = new THREE.Mesh(skyGeometry, materialArray);

    skyBox.position.x += 100
    skyBox.position.y += 100
    skyBox.position.z += 100

    scene.add(skyBox);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    renderer.setClearColor(0x666666, 1);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
}

function createControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();
}

function createMesh(geom, imageFile, normal) {

    if (normal) {
        var t = textureLoader.load("./textures/" + imageFile);
        var m = textureLoader.load("./textures/" + normal);

        // console.log(t, m)
        var mat2 = new THREE.MeshPhongMaterial({
            map: t,
            normalMap: m,
            transparent: true
        });

        var mesh = new THREE.Mesh(geom, mat2);
        // console.log(mesh)
        return mesh;
    } else {
        var t = textureLoader.load("./textures/" + imageFile);
        var mat1 = new THREE.MeshPhongMaterial({
            map: t
        })
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }

    return mesh;
}


function randomNumber() {
    const number = Math.min(6, 1 + Math.floor(Math.random() * 6))
    inputBox.value = number
}

