let edges = [];
let vertices = [];

class Vertex {
    constructor(i, j, k = 0, size = 10) {
        this.i = i
        this.j = j
        this.k = k
        this.size = size
        this.x = i * size
        this.y = k * size
        this.z = j * size
        this.inEdges = []
        this.outEdges = []
        this.gate = null
        this.voltage = 0
    }

    addOutEdge(vertex) {
        this.outEdges.push(vertex);
        edges.push(new Edge(this, vertex))
    }

    addInEdge(vertex) {
        this.inEdges.push(vertex);
    }
}

class Edge {
    constructor(vertexA, vertexB) {
        this.from = vertexA
        this.to = vertexB
        this.spheres = []
    }
}

// binaryBoxes
vertices.push(new Vertex(4, 0))
vertices.push(new Vertex(8, 0))
vertices.push(new Vertex(12, 0))

vertices.push(new Vertex(2, 0))

//j=2
vertices.push(new Vertex(8, 2))
vertices.push(new Vertex(11, 2))
vertices.push(new Vertex(7, 2))

//j=4
vertices.push(new Vertex(4, 4))
vertices.push(new Vertex(9, 4))

//j=6
vertices.push(new Vertex(4, 6))
vertices.push(new Vertex(5, 6))

//j=8 gates
vertices.push(new Vertex(11, 8))
vertices.push(new Vertex(9, 8))
vertices.push(new Vertex(7, 8))
vertices.push(new Vertex(5, 8))

//j=9 gates
vertices.push(new Vertex(10, 9))
vertices.push(new Vertex(6, 9))

// final turn 
vertices.push(new Vertex(6, 10))
vertices.push(new Vertex(2, 11))
vertices.push(new Vertex(10, 12))
vertices.push(new Vertex(10, 13))
vertices.push(new Vertex(12, 14))
vertices.push(new Vertex(6, 15))
vertices.push(new Vertex(2, 16))

function addEdge(from_i, from_j, from_k, to_i, to_j, to_k) {
    let from, to;
    for (let vertex of vertices) {
        if (from_i == vertex.i && from_j == vertex.j && from_k == vertex.k) from = vertex
        if (to_i == vertex.i && to_j == vertex.j && to_k == vertex.k) to = vertex
    }

    from.addOutEdge(to)
    to.addInEdge(from)
}

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
addEdge(2, 0, 0, 2, 11, 0)
addEdge(2, 0, 0, 2, 11, 0)
addEdge(2, 11, 0, 2, 16, 0)
addEdge(10, 9, 0, 10, 12, 0)
addEdge(10, 12, 0, 10, 13, 0)
addEdge(10, 12, 0, 10, 13, 0)
addEdge(6, 9, 0, 6, 10, 0)
addEdge(6, 10, 0, 6, 15, 0)


export function initCircuit(scene) {

    const radius = 1
    const sphereGeometry = new THREE.SphereGeometry(2, 10, 6)
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 })

    for (let edge of edges) {
        let from = edge.from
        let to = edge.to

        let dist;

        if (from.x != to.x) {
            if (from.x > to.x) {
                dist = from.x - to.x

                for (let x = from.x - radius; x >= to.x + radius; x -= 2 * radius + 5) {
                    let mesh = new THREE.Mesh(sphereGeometry, material)
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)
                }
            } else {
                dist = to.x - from.x

                for (let x = from.x + radius; x <= to.x - radius; x += 2 * radius + 5) {
                    let mesh = new THREE.Mesh(sphereGeometry, material)
                    mesh.position.set(x, from.y, from.z)
                    scene.add(mesh)
                    edge.spheres.push(mesh)
                }
            }
        }
        else if (from.z != to.z) {
            dist = to.z - to.z

            for (let z = from.z + radius; z <= to.z - radius; z += 2 * radius + 5) {
                let mesh = new THREE.Mesh(sphereGeometry, material)
                mesh.position.set(from.x, from.y, z)
                scene.add(mesh)
                edge.spheres.push(mesh)
            }
        }
    }
}

export function updateCircuit() {

    for (let edge of edges) {
        for (let i = 0; i < edge.spheres.length - 1; i++) {
            if (edge.spheres[i].material.color != edge.spheres[i + 1].material.color) {
                edge.spheres[i + 1].material.color.set(edge.spheres[i].color);
                break;
            }
        }
    }
}

export function setValueCircuit(value) {
    for (let i = 0; i < 3; i++) {
        vertices[i].voltage = value % 2;
        value = Math.floor(value / 2);
    }
}
