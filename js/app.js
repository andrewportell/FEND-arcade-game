// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);
    this.speed = (Math.random() * 125) + 50;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = -101;
        this.y = 63 + (Math.round(Math.random() * 2) * 83);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.reset();
    this.score = 0;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    for (var i in allEnemies) {
        if (this.x < allEnemies[i].x + 90 &&
            this.x + 65 > allEnemies[i].x + 2 &&
            this.y + 135 > allEnemies[i].y + 142 &&
            this.y + 65 < allEnemies[i].y + 79) {
            this.score -= 1;
            this.reset();
        }
    }

    if (this.y <= 0) {
        this.score += 1;
        this.reset();
    }

    // Renders Score
    ctx.font = '20px Comic Sans MS';
    ctx.fillStyle = 'blue';
    ctx.clearRect(0, 0, 450, 150);
    ctx.fillText('My Score: ' + this.score, 195, 35);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x - 101 >= 0)
        this.x -= 101;
    if (key == 'up' && this.y - 83 >= -11)
        this.y -= 83;
    if (key == 'right' && this.x + 101 < 505)
        this.x += 101;
    if (key == 'down' && this.y + 83 < 487)
        this.y += 83;
}

// Reset Player to starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Defines the number of enemies on the field
for (var index = 0; index < 5; index++) {
    var myEnemy = new Enemy();
    allEnemies.push(myEnemy);
};

// Place the player object in a variable called player
var player = new Player();

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