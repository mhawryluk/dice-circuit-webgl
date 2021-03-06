const cubeSize = 10;
const squareSize = 20;

const positions = [new THREE.Vector3(4 * squareSize, cubeSize / 2, 0), new THREE.Vector3(8 * squareSize, cubeSize / 2, 0), new THREE.Vector3(12 * squareSize, cubeSize / 2, 0)];
const boxes = []
const lights = []

function initBoxes() {
    let cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    for (let i = 0; i < 3; i++) {
        const cube = createMesh(cubeGeom, "box_texture.png", null, "box_bump.png")
        cube.position.copy(positions[i])
        cube.material.opacity = 1
        cube.material.color.set(0x222222)
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
            boxes[i].opacity = 1
        }
        else {
            color = 0xFFFFFF
            lights[i].intensity = 10;
            boxes[i].voltage = 1;
            boxes[i].opacity = .5
        }

        boxes[i].material.color.set(color)
    }
}