/** Array to store all enemy instances */
var allEnemies = [];


/** Var to store player's position */
var playerPos;


/**
 * Enemy
 *
 * @description Create a new Enemy instance, sets position and speed using the
 * .reset method, then sets the sprite for the enemy instance.
 * @constructor
 */
var Enemy = function() {
    this.reset();
    this.sprite = 'images/enemy-bug.png';
};


/**
 * Enemy.prototype.update
 *
 * @description Update enemy instances - Calls the .move method to set the
 * updated position.
 * @param  {number} dt - Time delta to control animation speed
 */
Enemy.prototype.update = function(dt) {
    this.move(dt);
};


/**
 * Enemy.prototype.render
 *
 * @description Render enemy instance - Draw the enemy instance sprite on the
 * canvas at the current x and y position.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * Enemy.prototype.randomNum
 *
 * @description Random number generator - Used for setting speed and row
 * position for enemies
 * @param  {number} min Minimum number value
 * @param  {number} max Maximum number value
 * @returns {number}     Random whole number between the min and max values
 */
Enemy.prototype.randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


/**
 * Enemy.prototype.move
 *
 * @description Increment the enemy's x value -  If the enemy is still crossing
 * the board, increment the x value using the speed property multiplied by the
 * time delta.
 * Then see if the enemy has collided with the player.
 * Else, reset the position and speed of the enemy.
 * @param  {type} dt Time delta passed from Enemy.prototype.update method
 */
Enemy.prototype.move = function (dt) {
    if (this.x < 606) {
        var timedSpeed = this.speed * dt;
        this.x = this.x + timedSpeed;
        this.collisionDetect();
    } else {
        this.reset();
    }
};


/**
 * Enemy.prototype.reset
 *
 * @description Reset enemy to a new starting position -  Reset enemy column,
 * row, y, x, and speed values. Row and speed values are randomized so that they
 * are different each time the enemy instance is reset.
 */
Enemy.prototype.reset = function () {
    this.col = 0;
    this.row = this.randomNum(1, 4);
    this.y = (this.row * 83) - 30;
    this.x = -101;
    this.speed = this.randomNum(100, 800);
};


/**
 * Enemy.prototype.setEnemyCol
 *
 * @description Set enemy column value - This column value is used to determine
 * if the enemy sprite has made contact with the player sprite.
 * @param  {number} x enemy's x position value
 * @returns {number}   column number
 */
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

/**
 * Enemy.prototype.collisionDetect
 *
 * @description Collision detection - If enemy is in the same row and column as
 * the player, player will be reset.
 */
Enemy.prototype.collisionDetect = function () {
    this.col = this.setEnemyCol(this.x);
    var enemyPos = this.row + "" + this.col;
    if (enemyPos === playerPos) {
        console.log("collision!");
        player.reset();
    }
};


/**
 * Player
 *
 * @description Create Player instance
 * @constructor
 */
var Player = function() {
    this.reset();
    this.sprite = 'images/char-boy.png';
};


/**
 * Player.prototype.update
 *
 * @description Update Player instance - this is required for this project, but
 * I haven't found a need to use a player update method. All player updates are
 * taken care of by the handleInput method.
 */
Player.prototype.update = function() {
};


/**
 * Player.prototype.render
 *
 * @description Render Player instance - Draw the player sprite on the canvas at
 * the current x and y position.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * Player.prototype.setPlayerPos
 *
 * @description Update playerPos var with current position - Updates the global
 * playerPos var which is used to detect if a enemy sprite has collided with the
 * player sprite
 * @param  {type} x player's x position
 * @param  {type} y player's y position
 */
Player.prototype.setPlayerPos = function (x,y) {
    playerPos = x + "" + y;
};


/**
 * Player.prototype.handleInput
 *
 * @description Handle keyboard input - Also checks if player is on the edge of
 * the board to prevent the player from moving out of bounds. Also checks if
 * player has won by reaching the top row, then resetting the player's position.
 * playerPos var is updated with current position (used for collision
 * detection).
 * @param  {string} key keyboard input
 */
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
    this.setPlayerPos(this.row, this.col);
};


/**
 * Player.prototype.reset
 *
 * @description Reset the player position - Player's column, row, x and y
 * properties are reset to the starting postion values. playerPos var is updated
 * with current position (used for collision detection).
 */
Player.prototype.reset = function () {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = (this.row * 83) - 40;
    this.setPlayerPos(this.row, this.col);
};



/** Create Player instance */
var player = new Player();


/**
 * createEnemies
 *
 * @description Create Enemy instances and add them to allEnemies array
 * @param  {number} enemyNum Number of enemies to create
 */
function createEnemies(enemyNum) {
    for (var i = 0; i < enemyNum; i++) {
        allEnemies.push(new Enemy());
    }
}

createEnemies(3);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
