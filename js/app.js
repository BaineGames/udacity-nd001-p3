// I got rid of starter code and converted to class syntax

class Enemy {
    constructor() {
        this.spawn();
        this.sprite = "images/enemy-bug.png";
    }
    update(dt) {
        this.x += this.sp * dt;
        if (this.x > 505) {
            this.spawn();
        }
        player.collision(this);
    }
    spawn() { // this method generates an enemy based on a random clamped Y and static off screen X with a variable speed
        this.x = -100;
        this.y = enemyLookupY[Math.floor(Math.random() * enemyLookupY.length)];
        this.sp = Math.floor(100 + (Math.random() * 300));
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(x, y, sp) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";
    }
    update(dt) {
        this.y > 400 ? this.y = 400 : 0;
        this.x > 400 ? this.x = 400 : 0;
        this.x < 0 ? this.x = 0 : 0;
        this.y < 0 ? this.win() : 0;
    }
    win() { // win condition method to increment win counter and update win text and  then reset the player
        wins++;
        document.getElementById("wins").textContent = `Wins: ${wins}`;
        this.y = 400;
    }
    collision(badguy) {
        // this method checks a variance of +- 70 pixels of the players X
        // value and the enemy X value while making sure they are on the same Y value.
        // If collision is found - death counter is incremented, UI updated, and player is reset.
        if (badguy.y == player.y && badguy.x + 70 > player.x && badguy.x - 70 < player.x) {
            player.reset();
        }
    }
    reset() { //resets player location to starting position
        this.x = 200;
        this.y = 400;
        losses++;
        document.getElementById("losses").textContent = `Deaths: ${losses}`;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) { // handles key inputs and moves player position accordingly
        switch (key) {
            case 'up':
                this.y -= 85;
                break;
            case 'down':
                this.y += 85;
                break;
            case 'left':
                this.x -= 100;
                break;
            case 'right':
                this.x += 100;
                break;
        }
    }
}
// init variables
const enemyLookupY = [60, 145, 230];
let wins = 0;
let losses = 0;
let allEnemies = [];
let player = new Player(200, 400);

// build enemies
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}

// update UI text on start
document.getElementById("game-title").textContent = `Death by Ladybug`;
document.getElementById("wins").textContent = `Wins: ${wins}`;
document.getElementById("losses").textContent = `Deaths: ${losses}`;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});