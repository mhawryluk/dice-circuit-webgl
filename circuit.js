const level1 = 4
const backx = 15

const edges = []
const vertices = []
const gates = []


const voltageColors = [0x202020, 0x00DD00]

class Vertex {
    constructor(i, j, k = 0) {
        this.i = i
        this.j = j
        this.k = k
        this.size = squareSize
        this.x = i * this.size
        this.y = k * this.size
        this.z = j * this.size
        this.inEdge;
        this.outEdges = []
        this.gate = null
        this.voltage = 0
    }

    addOutEdge(vertex) {
        let edge = new Edge(this, vertex)
        this.outEdges.push(edge)
        vertex.addInEdge(edge)
        edges.push(edge)
    }

    addInEdge(edge) {
        this.inEdge = edge;
    }
}

class Edge {
    constructor(vertexA, vertexB) {
        this.from = vertexA
        this.to = vertexB
        this.spheres = []
        this.lights = []
    }
}

function addEdge(from_i, from_j, from_k, to_i, to_j, to_k) {
    const from = getVertex(from_i, from_j, from_k)
    const to = getVertex(to_i, to_j, to_k)

    from.addOutEdge(to)
}

function getVertex(i, j, k) {
    for (let vertex of vertices) {
        if (i == vertex.i && j == vertex.j && k == vertex.k) return vertex;
    }
}


function initCircuit(scene) {

    const radius = 2
    const boxGeometry = new THREE.BoxGeometry(3 * squareSize, squareSize, squareSize)
    const sphereGeometry = new THREE.SphereGeometry(2, 10, 6)

    for (let gate of gates) {
        const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
        // const mesh = new THREE.Mesh(boxGeometry, material)
        const mesh = createMesh(boxGeometry, "CircuitBoard_512_albedo.png", "CircuitBoard_512_normal.png")

        mesh.position.set(gate.x, gate.y, gate.z)

        gate.box = mesh
        scene.add(mesh)
    }

    for (let edge of edges) {
        let from = edge.from
        let to = edge.to
        let dist

        if (from.x != to.x) {
            if (from.x > to.x) {
                dist = from.x - to.x

                for (let x = from.x - radius; x >= to.x + radius; x -= 2 * radius + 5) {
                    // const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                    const mesh = createMesh(sphereGeometry, "Plastic_albedo.png", "Plastic_normal.png")
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)
                }
            } else {
                dist = to.x - from.x

                for (let x = from.x + radius; x <= to.x - radius; x += 2 * radius + 5) {
                    // const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                    const mesh = createMesh(sphereGeometry, "Plastic_albedo.png", "Plastic_normal.png")
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)

                }
            }
        } else if (from.z != to.z) {
            for (let z = from.z + radius; z <= to.z - radius; z += 2 * radius + 5) {
                // const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                const mesh = createMesh(sphereGeometry, "Plastic_albedo.png", "Plastic_normal.png")
                mesh.position.set(from.x, from.y, z)
                scene.add(mesh)
                edge.spheres.push(mesh)

            }
        } else if (from.y != to.y) {
            for (let y = from.y + radius; y <= to.y - radius; y += 2 * radius + 5) {
                const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                const mesh = createMesh(sphereGeometry, "Plastic_albedo.png", "Plastic_normal.png")
                mesh.position.set(from.x, y, from.z)
                scene.add(mesh)
                edge.spheres.push(mesh)
            }
        }
    }
}

function updateCircuit() {

    // propagate voltage through edge 
    for (let edge of edges) {
        for (let i = 0; i < edge.spheres.length - 1; i++) {
            if (edge.spheres[i].material.color.getHex() != edge.spheres[i + 1].material.color.getHex()) {
                edge.spheres[i + 1].material.color.copy(edge.spheres[i].material.color);
                break;
            }
        }
    }


    // copy voltage on nodes
    for (let vertex of vertices) {
        if (vertex.inEdge != undefined) {
            for (let edge of vertex.outEdges) {
                edge.spheres[0].material.color.copy(vertex.inEdge.spheres[vertex.inEdge.spheres.length - 1].material.color)
            }
            vertex.voltage = Object.keys(voltageColors).find(key => voltageColors[key] === vertex.inEdge.spheres[vertex.inEdge.spheres.length - 1].material.color.getHex());
            //console.log(vertex.voltage)
        } else {
            for (let edge of vertex.outEdges) {
                // console.log(vertex.voltage)
                // console.log(vertex)
                let color = voltageColors[vertex.voltage];
                edge.spheres[0].material.color.set(color)
            }
        }
    }

    // update gates
    for (let gate of gates) {
        gate.update()
    }
}

function setValueCircuit(value) {
    for (let i = 0; i < 3; i++) {
        vertices[i].voltage = Math.min(value & Math.pow(2, 2 - i), 1)
    }
}
