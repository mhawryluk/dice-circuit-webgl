const diceDots = []
const diceColors = [0x010101, 0xff0000]
const diceWidth = 125, diceHeight = 125
const centerPos = new THREE.Vector3(15 * squareSize + diceWidth / 2, level1 * squareSize + diceHeight / 2 - 10, 13 * squareSize)

class Dot {
    constructor(input, i, j) {
        this.input = input
        this.voltage = 0

        this.radius = 9
        const sphereGeometry = new THREE.SphereGeometry(this.radius, 10, 6)
        const material = new THREE.MeshBasicMaterial({ color: diceColors[0] })
        const mesh = new THREE.Mesh(sphereGeometry, material)

        this.x = centerPos.x - diceWidth / 2
        this.y = centerPos.y - diceHeight / 4 + i * diceHeight / 4
        this.z = centerPos.z - diceWidth / 4 + j * diceWidth / 4

        mesh.position.set(this.x, this.y, this.z)
        mesh.material.color.set(diceColors[0])
        mesh.material.reflectivity = 0

        mesh.material.opacity = 0.8
        mesh.castShadow = true

        scene.add(mesh)
        this.sphere = mesh

        this.light = new THREE.PointLight(0xff0000, 0, 50)
        this.light.position.set(this.x - 2, this.y, this.z)
        scene.add(this.light)

        diceDots.push(this)
    }

    update() {
        if (this.input && this.input.voltage != this.voltage) {
            this.voltage = this.input.voltage
            this.sphere.material.color.set(diceColors[this.voltage])
            
            this.light.intensity = 10*this.voltage
        }
    }
}

function initDice() {
    const boxGeometry = new THREE.BoxGeometry(diceWidth, diceHeight, diceWidth)
    const albedo = textureLoader.load("../textures/CircuitBoard_512_albedo.png");
    const normal = textureLoader.load("../textures/CircuitBoard_512_normal.png");
    const metallic = textureLoader.load("../textures/CircuitBoard_512_metallic.png");
    const roughness = textureLoader.load("../textures/CircuitBoard_512_roughness.png");

    const mat2 = new THREE.MeshStandardMaterial({
            map: albedo,
            normalMap: normal,
            metalnessMap: metallic,
            roughnessMap: roughness,
        });

    const boxMesh = new THREE.Mesh(boxGeometry, mat2);
    boxMesh.position.copy(centerPos)
    boxMesh.material.reflectivity = 0

    scene.add(boxMesh)


    const vertexInput = [
        vertices[34],
        vertices[31],
        vertices[37],
        null,
        vertices[35],
        null,
        vertices[32],
        vertices[36],
        vertices[33],
    ]

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            new Dot(vertexInput[3 * i + j], i, j)
        }
    }
}

function updateDice() {
    for (let dot of diceDots) {
        dot.update()
    }
}