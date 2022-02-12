export class Gate {
    constructor(inVertex1, inVertex2, outVertex, type) {
        this.in1 = inVertex1
        this.in2 = inVertex2
        this.out = outVertex
        this.type = type
        this.box = null

        this.x = (this.in1.x + this.in2.x) / 2
        this.y = this.in1.y
        this.z = (this.in1.z + this.out.z) / 2

    }

    update() {
        if (this.type == 'AND') {
            this.out.voltage = this.in1.voltage && this.in2.voltage
        } else if (this.type == 'OR') {
            this.out.voltage = this.in1.voltage || this.in2.voltage
        }
    }
}