const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var agentArray = [];

(function setup() {
    agentArray[0] = new Agent(0);
    agentArray[1] = new Agent(1);
    agentArray[2] = new Agent(2);
    var fruit = [];
    var redFruit = [];
    var isGameOver = false;

    //Creating foods
    for (let i = 0; i < 90; i++) {
        //Creating green fruits
        fruit.push(new Fruit());
        fruit[i].pickLocation();
        //Creating red fruits
        redFruit.push(new RedFruit());
        redFruit[i].pickLocation();
    }

    window.setInterval(() => {
        if (!isGameOver) {
            if (fruit.length == 0) {
                isGameOver = true;
                alert("Fruits are gone.");
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < fruit.length; i++) {
                fruit[i].draw();
            }
            for (let i = 0; i < redFruit.length; i++) {
                redFruit[i].draw();
            }
            for (let i = 0; i < agentArray.length; i++) {
                agentArray[i].update();
                agentArray[i].draw();
                var closest = agentArray[i].findClosest(fruit, agentArray);
                if (!closest || !closest[0]) {
                    agentArray[i].moveToClosest();
                    continue;
                }
                if (this.x != closest[0].x && this.y != closest[0].y) {
                    agentArray[i].moveToClosest(closest[0]);
                }


                if (agentArray[i].eat(fruit)) {
                    fruit.splice(closest[1], 1);
                    agentArray[i].score++;
                    document.getElementById("agent" + i).innerHTML = agentArray[i].score;
                }
                if (agentArray[i].eat(redFruit)) {
                    redfruit.splice(closest[1], 1);
                    agentArray[i].score--;
                    document.getElementById("agent" + i).innerHTML = agentArray[i].score;
                }
            }
        }
    }, 250);
}());