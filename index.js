let container, controls;
let camera, scene, renderer, light;

const textureLoader = new THREE.TextureLoader()

const clock = new THREE.Clock();
const inputBox = document.getElementById('number')

let counter = 0

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

    // clock.start()
}


function animate() {

    counter++;
    // if (counter % 500 == 0) console.log(camera)
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


function randomNumber() {
    const number = Math.min(6, 1 + Math.floor(Math.random() * 6))
    inputBox.value = number
}

