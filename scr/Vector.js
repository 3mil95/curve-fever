

class Vector {
    x = 0;
    y = 0;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add = (vec) => {
        this.x += vec.x;
        this.y += vec.y;
    }

    dist = (vec) => {
        return Math.pow((Math.pow((this.x - vec.x),2) + Math.pow((this.y - vec.y),2)),0.5)
    }
}