const cubeSize = 10;
const squareSize = 20;

const positions = [new THREE.Vector3(4 * squareSize, cubeSize / 2, 0), new THREE.Vector3(8 * squareSize, cubeSize / 2, 0), new THREE.Vector3(12 * squareSize, cubeSize / 2, 0)];
const boxes = []
const lights = []

function initBoxes(scene) {
    let cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    for (let i = 0; i < 3; i++) {

        // var cubeMaterial = new THREE.MeshBasicMaterial({
        //     color: 0x222222
        // });

        // let cube = new THREE.Mesh(cubeGeom, cubeMaterial)
        const cube = createMesh(cubeGeom, "CircuitBoard_512_albedo.png", "CircuitBoard_512_normal.png")
        cube.position.copy(positions[i])
        cube.material.opacity = 0.7
        scene.add(cube)
        boxes.push(cube)

        const light = new THREE.PointLight(0xffffff, 0, 20)
        light.position.set(cube.position.x, cube.position.y, cube.position.z)
        scene.add(light)
        lights.push(light)
    }

    return boxes
}

function setValueBoxes(value) {

    for (let i = 0; i < boxes.length; i++) {
        let color;

        if ((value & Math.pow(2, boxes.length - i - 1)) == 0) {
            color = 0x222222
            lights[i].intensity = 0;
        }
        else {
            color = 0xFFFFFF
            lights[i].intensity = 10;
            boxes[i].voltage = 1;
        }

        // value = Math.floor(value / 2)

        boxes[i].material.color.set(color)
    }
}