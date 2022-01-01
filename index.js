var container, stats, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixers = Array(10);
let i = 0;

let space = 90;

let positionsx = [-2 * space, -space, 0, space, 2 * space, -3 * space, 3 * space, -3 * space, 3 * space];
let positionsz = [-100, -50, 0, -50, -100, 0, 0, -2 * space, -2 * space];

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(100, 200, 300);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x89c2d9);
    // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

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

    // scene.add( new CameraHelper( light.shadow.camera ) );



    // ground
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: true }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;

    let texture = THREE.ImageUtils.loadTexture("../lab03/textures/floor-wood.jpg");
    mesh.material.map = texture;
    mesh.material.map = texture;


    scene.add(mesh);

    // model
    var loader = new THREE.FBXLoader();

    const loadFunc = function (object) {

        mixers[i] = new THREE.AnimationMixer(object);

        var action = mixers[i].clipAction(object.animations[0]);
        action.play();

        object.traverse(function (child) {

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;


                var texture = THREE.ImageUtils.loadTexture("../lab03/textures/metal-floor.jpg");
                child.material.map = texture;
                child.material.map = texture;

                // console.log('child', child);

                if (i < 5) {
                    child.material.color.r = 62 / 255;
                    child.material.color.g = 31 / 255;
                    child.material.color.b = 71 / 255;
                } else {
                    child.material.color.r = 0;
                    child.material.color.g = 175 / 255;
                    child.material.color.b = 185 / 255;
                }

            }

        });


        object.position.x = positionsx[i];
        object.position.z = positionsz[i];
        i++;
        scene.add(object);
    };

    for (let j = 0; j < 5; j++) loader.load('models/fbx/Salsa Dancing.fbx', loadFunc);
    for (let j = 0; j < 4; j++) loader.load('models/fbx/Samba Dancing.fbx', loadFunc);

    let skyGeometry = new THREE.CubeGeometry(2000, 2000, 2000);

    let materialArray = [];
    for (let j = 0; j < 6; j++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("../lab03/textures/cloud.jpg"),
            side: THREE.BackSide
        }));

    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skyBox);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 100, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);

    // stats
    stats = new Stats();
    container.appendChild(stats.dom);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

    requestAnimationFrame(animate);

    var delta = clock.getDelta();

    for (let mixer of mixers) {
        if (mixer) mixer.update(delta);
    }

    renderer.render(scene, camera);

    stats.update();

}