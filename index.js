let container, controls;
let camera, scene, renderer, light;

const clock = new THREE.Clock();

let binaryBoxes;
let value = 0;

init();
animate();


function init() {

    container = document.getElementById('animation');

    scene = new THREE.Scene();

    cameraInit();
    lightsInit();

    createGround();
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

    let enteredValue = document.getElementById('number').value
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
    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
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
    mesh.position.x = - Math.pi/2;
    // mesh.position.y -= 50;

    const texture = THREE.ImageUtils.loadTexture("textures/CircuitBoard_512_albedo.png");
    const normalTexture = THREE.ImageUtils.loadTexture("textures/metal-floor.jpg");
    mesh.material.map = texture;
    mesh.material.normalMap = normalTexture;

    scene.add(mesh)
}

function createSkyBox() {

    let skyGeometry = new THREE.CubeGeometry(512, 512, 512);

    let materialArray = [];
    for (let j = 0; j < 6; j++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("textures/metal-floor.jpg"),
            side: THREE.BackSide
        }));

    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);

    skyBox.position.y -= 10;

    scene.add(skyBox);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
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
        var t = THREE.ImageUtils.loadTexture("textures/" + imageFile);
        var m = THREE.ImageUtils.loadTexture("textures/" + normal);

        console.log(t, m)
        var mat2 = new THREE.MeshPhongMaterial({
            map: t,
            normalMap: m
        });

        var mesh = new THREE.Mesh(geom, mat2);
        console.log(mesh)
        return mesh;
    } else {
        var t = THREE.ImageUtils.loadTexture("textures/" + imageFile);
        var mat1 = new THREE.MeshPhongMaterial({
            map: t
        })
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }

    return mesh;
}

