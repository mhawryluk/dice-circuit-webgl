const diceDots = []
const diceColors = [0x010101, 0xffff00]
const diceWidth = 100, diceHeight = 100
const centerPos = new THREE.Vector3(15 * squareSize, level1 * squareSize + diceHeight / 2 - 10, 13 * squareSize)

class Dot {
    constructor(input, i, j) {
        this.radius = 7
        const sphereGeometry = new THREE.SphereGeometry(this.radius, 10, 6)
        const material = new THREE.MeshBasicMaterial({ color: diceColors[0] })
        const mesh = new THREE.Mesh(sphereGeometry, material)
        mesh.position.set(centerPos.x, centerPos.y - diceHeight / 4 + i * diceHeight / 4, centerPos.z - diceWidth / 4 + j * diceWidth / 4)

        this.sphere = mesh
        this.input = input
        this.voltage = 0

        scene.add(mesh)
        diceDots.push(this)
    }

    update() {
        if (this.input && this.input.voltage != this.voltage) {
            this.voltage = this.input.voltage
            this.sphere.material.color.set(diceColors[this.voltage])
        }
    }
}

function initDice() {


    const boxGeometry = new THREE.BoxGeometry(1, diceHeight, diceWidth)
    const material = new THREE.MeshBasicMaterial({ color: 0x111111 })

    const boxMesh = new THREE.Mesh(boxGeometry, material)

    boxMesh.position.copy(centerPos)

    scene.add(boxMesh)


    const vertexInput = [
        vertices[17],
        vertices[20],
        vertices[23],
        null,
        vertices[21],
        null,
        vertices[18],
        vertices[19],
        vertices[22],
    ]

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            new Dot(vertexInput[3*i+j], i, j)
        }
    }
}

function updateDice() {
    for (let dot of diceDots) {
        dot.update()
    }
}