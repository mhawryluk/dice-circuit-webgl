const level1 = 4
const backX = 15

const edges = []
const vertices = []
const gates = []

const voltageColors = [0x0e0e1b, 0x0496ff]

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

        this.light = new THREE.PointLight(voltageColors[1], 0, 10)
        this.light.position.set(this.x, this.y, this.z)
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


function initCircuit() {

    const boxGeometry = new THREE.BoxGeometry(3 * squareSize, squareSize, squareSize)
    const space = Math.floor(squareSize / 4)

    let mesh = createMesh(boxGeometry, 'or_gate.png', null, 'or_bump.png')
    mesh.position.set(gates[0].x, gates[0].y, gates[0].z)
    gates[0].box = mesh
    scene.add(mesh)

    mesh = createMesh(boxGeometry, 'and_gate.png', null, 'and_bump.png')
    mesh.position.set(gates[1].x, gates[1].y, gates[1].z)
    gates[1].box = mesh
    scene.add(mesh)


    for (let edge of edges) {
        let from = edge.from
        let to = edge.to

        if (from.x != to.x) {
            if (from.x > to.x)
                for (let x = from.x - space; x >= to.x; x -= space)
                    createElectron(x, from.y, from.z, edge)
            else
                for (let x = from.x + space; x <= to.x; x += space)
                    createElectron(x, from.y, from.z, edge)
        }

        else if (from.z != to.z) {
            if (from.z < to.z)
                for (let z = from.z + space; z <= to.z; z += space)
                    createElectron(from.x, from.y, z, edge)
            else
                for (let z = from.z - space; z >= to.z; z -= space)
                    createElectron(from.x, from.y, z, edge)
        }

        else if (from.y != to.y) {
            if (from.y < to.y)
                for (let y = from.y + space; y <= to.y; y += space)
                    createElectron(from.x, y, from.z, edge)
            else
                for (let y = from.y - space; y >= to.y; y -= space)
                    createElectron(from.x, y, from.z, edge)
        }
    }
}

const sphereGeometry = new THREE.SphereGeometry(2, 10, 6)

function createElectron(x, y, z, edge) {
    const material = new THREE.MeshBasicMaterial({ color: voltageColors[0] })
    const mesh = new THREE.Mesh(sphereGeometry, material)
    mesh.position.set(x, y, z)
    scene.add(mesh)
    edge.spheres.push(mesh)
}

let deltaSum = 0;
let delta = 0;

function updateCircuit() {

    delta = clock.getDelta()
    deltaSum += delta
    if (deltaSum > 0.015) {
        // propagate voltage through edge 
        for (let edge of edges) {
            for (let i = 0; i < edge.spheres.length - 1; i++) {
                if (edge.spheres[i].material.color.getHex() != edge.spheres[i + 1].material.color.getHex()) {
                    edge.spheres[i + 1].material.color.copy(edge.spheres[i].material.color);
                    break;
                }
            }
        }

        deltaSum = 0;
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
    for (let gate of gates)
        gate.update()
}

function setValueCircuit(value) {
    for (let i = 0; i < 3; i++) {
        vertices[i].voltage = Math.min(value & Math.pow(2, 2 - i), 1)
    }
}
