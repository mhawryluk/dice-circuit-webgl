const cubeSize = 10;
const squareSize = 10;

const positions = [new THREE.Vector3(4 * squareSize, cubeSize / 2, 0), new THREE.Vector3(8 * squareSize, cubeSize / 2, 0), new THREE.Vector3(12 * squareSize, cubeSize / 2, 0)];
const boxes = [];

export function initBoxes(scene, value = 0) {
    let cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    for (let i = 0; i < 3; i++) {

        let color;
        if (value % 2 == 0) color = 0x222222
        else color = 0xFFFFFF

        value = Math.floor(value / 2)

        var cubeMaterial = new THREE.MeshBasicMaterial({
            color: color
        });

        let cube = new THREE.Mesh(cubeGeom, cubeMaterial)
        cube.position.copy(positions[i])
        console.log(cube.position)
        scene.add(cube)
        boxes.push(cube)
    }

    return boxes
}

export function setValueBoxes(value) {

    for (let box of boxes) {
        let color;
        if (value % 2 == 0) color = 0x222222
        else color = 0xFFFFFF

        box.material.color.set(color)

        value = Math.floor(value / 2)
    }
}