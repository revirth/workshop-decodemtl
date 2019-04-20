class Enemy {
  update(timeDiff) {
    if (ENEMY_DIAGONAL) {
      var angle = 80;
      var angleRad = angle * (Math.PI / 180);

      this.x = this.mvLeft
        ? this.x + timeDiff * this.speed * Math.cos(angleRad)
        : this.x - timeDiff * this.speed * Math.cos(angleRad);

      this.y = this.y + timeDiff * this.speed * Math.sin(angleRad);

      this.domElement.style.left = this.x;
      this.domElement.style.top = this.y;
    } else {
      this.y = this.y + timeDiff * this.speed;
      this.domElement.style.top = this.y;
    }

    if (
      this.x + ENEMY_WIDTH < 0 ||
      this.x > GAME_WIDTH ||
      this.y > GAME_HEIGHT
    ) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
  constructor(root, enemySpot, speed, mvLeft, level) {
    this.root = root;
    this.spot = enemySpot;
    this.mvLeft = mvLeft;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.domElement = document.createElement("img");

    if (level > GAME_MAX_LEVEL) level = GAME_MAX_LEVEL;

    this.life = level * 5 + 1;

    // this.domElement.src = "images/enemy.png";
    this.speed = Math.random() / 2 + 0.05 * level;
    this.domElement.src = "images/enemy" + level + ".gif";
    this.domElement.width = 75 + (75 * level) / 5;
    this.domElement.height = 75 + (75 * level) / 5;

    if (DEBUG_MODE) this.domElement.style.border = "1px solid red";

    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x;
    this.domElement.style.top = this.y;
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
  }

  hitted(weapon) {
    this.life -= weapon.power;

    this.domElement.style.top -= 20;
  }

  explose() {
    this.domElement.src = "images/explosion2.gif";
    this.destroyed = true;

    new Audio("./mp3/explosion0.mp3").play();
    // SND_EXPLOSE[0].pause();
    // SND_EXPLOSE[0].play();

    setTimeout(() => {
      try {
        this.root.removeChild(this.domElement);
      } catch (error) {}
    }, EXPLOSE_MS);
  }
}
