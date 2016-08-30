var allEnemies = [];

var Enemy = function() {
    this.col = 0;
    this.row = this.randomNum(1, 4);
    this.x = -101;
    this.y = (this.row * 83) - 30;
    this.speed = this.randomNum(100, 800);
    this.sprite = 'images/enemy-bug.png';
    allEnemies.push(this);
};

Enemy.prototype.update = function(dt) {
    if (this.x < 606) {
        var timedSpeed = this.speed * dt;
        this.x = this.x + timedSpeed;
        this.col = this.setEnemyCol(this.x);
        var enemyPos = this.row + "" + this.col;
        if (enemyPos === playerPos) {
            console.log("collision!");
            player.reset();
        }
    } else {
        this.row = this.randomNum(1, 4);
        this.y = (this.row * 83) - 30;
        this.x = -101;
        this.speed = this.randomNum(100, 800);
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

Enemy.prototype.setEnemyCol = function (x) {
    for (var i = 0; i < 5; i++) {
        var colStart = (i * 101) - 63;
        var colEnd = colStart + 100;
        if (x > colStart && x < colEnd) {
            var col = i;
            return col;
        }
    }
};

var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var playerPos;

Player.prototype.handleInput = function(key) {
    var moveY = 83;
    var moveX = 101;
    if (key === "up" && this.row > 0) {
        this.y -= moveY;
        this.row--;
        if (this.row === 0) {
            this.reset();
            console.log("win!");
        }
    } else if (key === "down" && this.row < 5) {
        this.y += moveY;
        this.row++;
    } else if (key === "left" && this.col > 0) {
        this.x -= moveX;
        this.col--;
    } else if (key === "right" && this.col < 4) {
        this.x += moveX;
        this.col++;
    }
    playerPos = this.row + "" + this.col;
};

Player.prototype.reset = function () {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = (this.row * 83) - 40;
    playerPos = this.row + "" + this.col;
};

player = new Player();

bob = new Enemy();
frank = new Enemy();
jim = new Enemy();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
