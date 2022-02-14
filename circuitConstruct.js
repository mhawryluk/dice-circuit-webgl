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


vertices.push(new Vertex(6, 10, level1)) //24
vertices.push(new Vertex(2, 11, level1)) //25
vertices.push(new Vertex(10, 12, level1)) //26
vertices.push(new Vertex(10, 13, level1)) //27
vertices.push(new Vertex(12, 14, level1)) //28
vertices.push(new Vertex(6, 15, level1)) //29
vertices.push(new Vertex(2, 16, level1)) //30


vertices.push(new Vertex(backx, 10, level1)) //31
vertices.push(new Vertex(backx, 11, level1)) //32
vertices.push(new Vertex(backx, 12, level1)) //33
vertices.push(new Vertex(backx, 13, level1)) //34
vertices.push(new Vertex(backx, 14, level1)) //35
vertices.push(new Vertex(backx, 15, level1)) //36
vertices.push(new Vertex(backx, 16, level1)) //37

// GATES

gates.push(new Gate(vertices[11], vertices[12], vertices[15], 'OR'))
gates.push(new Gate(vertices[13], vertices[14], vertices[16], 'AND'))

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