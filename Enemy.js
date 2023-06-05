class Enemy {
    constructor(){
        this.x = 20;
        this.y = 4;
        this.speed = 30;

    }

    move(){
        this.x = this.x + 1
        console.log("移動した");
        console.log(this.x);
        console.log(this.y);
    }
}

let enemy_1 = new Enemy();
enemy_1.move();