import { Gate } from "./gates.js"

const level1 = 4
const backx = 15

const edges = []
const vertices = []
const gates = []
const cubeSize = 10
const squareSize = 10

const voltageColors = {
    0: 0xFF00FF,
    1: 0x00FF00,
}

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

// VERTICES

// binaryBoxes
vertices.push(new Vertex(4, 0)) //0
vertices.push(new Vertex(8, 0)) //1
vertices.push(new Vertex(12, 0)) //2

vertices.push(new Vertex(2, 0)) //3

//j=2
vertices.push(new Vertex(8, 2)) //4
vertices.push(new Vertex(11, 2)) //5
vertices.push(new Vertex(7, 2)) //6

//j=4
vertices.push(new Vertex(4, 4)) //7
vertices.push(new Vertex(9, 4)) //8

//j=6
vertices.push(new Vertex(4, 6)) //9
vertices.push(new Vertex(5, 6)) //10

//j=8 gates
vertices.push(new Vertex(11, 8)) //11
vertices.push(new Vertex(9, 8)) //12
vertices.push(new Vertex(7, 8)) //13
vertices.push(new Vertex(5, 8)) //14

//j=9 gates
vertices.push(new Vertex(10, 9)) //15
vertices.push(new Vertex(6, 9)) //16

// final turn 
vertices.push(new Vertex(6, 10)) //17
vertices.push(new Vertex(2, 11)) //18
vertices.push(new Vertex(10, 12)) //19
vertices.push(new Vertex(10, 13)) //20
vertices.push(new Vertex(12, 14)) //21
vertices.push(new Vertex(6, 15)) //22
vertices.push(new Vertex(2, 16)) //23


vertices.push(new Vertex(6, 10, level1)) //17
vertices.push(new Vertex(2, 11, level1)) //18
vertices.push(new Vertex(10, 12, level1)) //19
vertices.push(new Vertex(10, 13, level1)) //20
vertices.push(new Vertex(12, 14, level1)) //21
vertices.push(new Vertex(6, 15, level1)) //22
vertices.push(new Vertex(2, 16, level1)) //23


vertices.push(new Vertex(backx, 10, level1)) //17
vertices.push(new Vertex(backx, 11, level1)) //18
vertices.push(new Vertex(backx, 12, level1)) //19
vertices.push(new Vertex(backx, 13, level1)) //20
vertices.push(new Vertex(backx, 14, level1)) //21
vertices.push(new Vertex(backx, 15, level1)) //22
vertices.push(new Vertex(backx, 16, level1)) //23

// GATES

gates.push(new Gate(vertices[11], vertices[12], vertices[15], 'AND'))
gates.push(new Gate(vertices[13], vertices[14], vertices[16], 'OR'))

// EDGES

addEdge(12, 0, 0, 12, 14, 0)
addEdge(8, 0, 0, 8, 2, 0)
addEdge(8, 2, 0, 11, 2, 0)
addEdge(8, 2, 0, 7, 2, 0)
addEdge(4, 4, 0, 9, 4, 0)
addEdge(4, 4, 0, 4, 6, 0)
addEdge(4, 6, 0, 5, 6, 0)
addEdge(5, 6, 0, 5, 8, 0)
addEdge(7, 2, 0, 7, 8, 0)
addEdge(11, 2, 0, 11, 8, 0)
addEdge(9, 4, 0, 9, 8, 0)
addEdge(9, 4, 0, 9, 8, 0)
addEdge(4, 0, 0, 2, 0, 0)
addEdge(4, 0, 0, 4, 4, 0)
addEdge(2, 0, 0, 2, 11, 0)
addEdge(2, 11, 0, 2, 16, 0)
addEdge(10, 9, 0, 10, 12, 0)
addEdge(10, 12, 0, 10, 13, 0)
addEdge(10, 12, 0, 10, 13, 0)
addEdge(6, 9, 0, 6, 10, 0)
addEdge(6, 10, 0, 6, 15, 0)

addEdge(6, 10, 0, 6, 10, level1)
addEdge(2, 11, 0, 2, 11, level1)
addEdge(10, 12, 0, 10, 12, level1)
addEdge(10, 13, 0, 10, 13, level1)
addEdge(12, 14, 0, 12, 14, level1)
addEdge(6, 15, 0, 6, 15, level1)
addEdge(2, 16, 0, 2, 16, level1)


addEdge(6, 10, level1, backx, 10, level1)
addEdge(2, 11, level1, backx, 11, level1)
addEdge(10, 12, level1, backx, 12, level1)
addEdge(10, 13, level1, backx, 13, level1)
addEdge(12, 14, level1, backx, 14, level1)
addEdge(6, 15, level1, backx, 15, level1)
addEdge(2, 16, level1, backx, 16, level1)


export function initCircuit(scene) {

    const radius = 1
    const boxGeometry = new THREE.BoxGeometry(3 * squareSize, squareSize, squareSize)
    const sphereGeometry = new THREE.SphereGeometry(2, 10, 6)

    for (let gate of gates) {
        const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
        const mesh = new THREE.Mesh(boxGeometry, material)

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
                    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                    const mesh = new THREE.Mesh(sphereGeometry, material)
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)
                }
            } else {
                dist = to.x - from.x

                for (let x = from.x + radius; x <= to.x - radius; x += 2 * radius + 5) {
                    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                    const mesh = new THREE.Mesh(sphereGeometry, material)
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)
                }
            }
        } else if (from.z != to.z) {
            for (let z = from.z + radius; z <= to.z - radius; z += 2 * radius + 5) {
                const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                const mesh = new THREE.Mesh(sphereGeometry, material)
                mesh.position.set(from.x, from.y, z)
                scene.add(mesh)
                edge.spheres.push(mesh)
            }
        } else if (from.y != to.y) {
            for (let y = from.y + radius; y <= to.y - radius; y += 2 * radius + 5) {
                const material = new THREE.MeshBasicMaterial({ color: 0x888888 })
                const mesh = new THREE.Mesh(sphereGeometry, material)
                mesh.position.set(from.x, y, from.z)
                scene.add(mesh)
                edge.spheres.push(mesh)
            }
        }
    }
}

export function updateCircuit() {

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

export function setValueCircuit(value) {
    for (let i = 0; i < 3; i++) {
        vertices[i].voltage = value % 2;
        value = Math.floor(value / 2);
    }
}
