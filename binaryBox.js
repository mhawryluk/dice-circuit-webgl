const cubeSize = 10;
const squareSize = 10;

const positions = [new THREE.Vector3(4 * squareSize, cubeSize / 2, 0), new THREE.Vector3(8 * squareSize, cubeSize / 2, 0), new THREE.Vector3(12 * squareSize, cubeSize / 2, 0)];
const boxes = [];

function initBoxes(scene) {
    let cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    for (let i = 0; i < 3; i++) {

        var cubeMaterial = new THREE.MeshBasicMaterial({
            color: 0x222222
        });

        let cube = new THREE.Mesh(cubeGeom, cubeMaterial)
        cube.position.copy(positions[i])
        scene.add(cube)
        boxes.push(cube)
    }

    return boxes
}

function setValueBoxes(value) {

    for (let i = 0; i < boxes.length; i++) {
        let color;

        if ((value & Math.pow(2, boxes.length - i - 1)) == 0) {
            color = 0x222222
        }
        else {
            color = 0xFFFFFF
            boxes[i].voltage = 1;
        }

        // value = Math.floor(value / 2)

        boxes[i].material.color.set(color)
    }
}