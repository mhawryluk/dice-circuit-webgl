let cubeSize = 10;
let squareSize = 10;
let xRange = 100;
let positions = [new THREE.Vector3(4*squareSize, cubeSize / 2, 0), new THREE.Vector3(8*squareSize, cubeSize / 2, 0), new THREE.Vector3(12*squareSize, cubeSize / 2, 0)];


export default function initBoxes(value = 6) {

    let boxes = [];
    let cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    for (let i = 0; i < 3; i++) {

        let color;
        if (value % 2 == 0) color = 0x222222;
        else color = 0xFFFFFF;

        value = Math.floor(value / 2)

        var cubeMaterial = new THREE.MeshBasicMaterial({
            color: color
        });

        let cube = new THREE.Mesh(cubeGeom, cubeMaterial);
        cube.position.copy(positions[i]);
        console.log(cube.position)
        boxes.push(cube);
    }

    return boxes;
}