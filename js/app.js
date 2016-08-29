// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.col = 0;
    this.row = this.randomNum(1, 4);
    this.x = -101;
    this.y = (this.row * 83) - 30;
    this.speed = this.randomNum(100, 800);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function setEnemyCol(x) {
    for (var i = 0; i < 5; i++) {
        var colStart = (i * 101) - 63;
        var colEnd = colStart + 100;
        if (x > colStart && x < colEnd) {
            var col = i;
            return col;
        }
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 606) {
        var timedSpeed = this.speed * dt;
        this.x = this.x + timedSpeed;
        this.col = setEnemyCol(this.x);
        var enemyPos = this.row + "" + this.col;
        if (enemyPos === playerPos) {
            player.reset();
        }
        //console.log(enemyPos);
    } else {
        // reset enemy position and speed
        this.row = this.randomNum(1, 4);
        this.y = (this.row * 83) - 30;
        this.x = -101;
        this.speed = this.randomNum(100, 800);
    }
};

var colPosition = [];

var setColPosition = function () {
    for (var i = 0; i < 5; i++) {
        hitPosition = (i * 101) - 63;
        colPosition.push(hitPosition);
    }
}

setColPosition();



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function () {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = (this.row * 83) - 40;
    console.log("back to start");
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
console.log(player.test);

bob = new Enemy();
frank = new Enemy();
jim = new Enemy();
var allEnemies = [];
allEnemies.push(bob);
allEnemies.push(frank);
allEnemies.push(jim);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
