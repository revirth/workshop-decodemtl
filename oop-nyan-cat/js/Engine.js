class Engine {
  gameLoop = () => {
    if (this.lastFrame === undefined) this.lastFrame = new Date().getTime();
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    // ENEMIES
    if (this.pause_ms === 0)
      this.enemies.forEach(enemy => {
        enemy.update(timeDiff);

        // COLLISION player, enemy
        if (
          !DEBUG_MODE &&
          hittest(this.player.domElement, enemy.domElement, 40)
        ) {
          PLAYER_DEAD = true;

          this.player.explose();
          enemy.explose();
        }

        // COLLISION enemy, weapon
        this.weapons.forEach(weapon => {
          if (hittest(weapon.domElement, enemy.domElement, 5)) {
            weapon.destroyed = true;
            enemy.hitted(weapon);

            if (enemy.life < 1) {
              weapon.explose();
              enemy.explose();
            }
          }
        });
      });
    this.enemies = this.enemies.filter(enemy => !enemy.destroyed);

    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies);
      let mvLeft = Math.random() >= 0.5; // move to left or right?
      let speed = Math.random() / 10000;
      let enem = new Enemy(this.root, spot, speed, mvLeft, PLAYER_LEVEL);

      this.enemies.push(enem);
    }

    // WEAPONS
    this.weapons.forEach(weapon => {
      weapon.update(timeDiff);
    });
    this.weapons = this.weapons.filter(weapon => !weapon.destroyed);

    // SCORE, LEVEL TEXT
    PLAYER_SCORE += 10;
    this.textL.update("Score " + PLAYER_SCORE);

    if (PLAYER_LEVEL < Math.floor(PLAYER_SCORE / LEVELUP_PER_SCORE)) {
      this.levelUp(Math.floor(PLAYER_SCORE / LEVELUP_PER_SCORE));
    } else {
      this.txtLV.update("");
      this.pause_ms = 0;
    }

    // CHECK GAMEOVER
    if (PLAYER_DEAD) {
      setTimeout(() => {
        if (
          window.confirm(
            `Game Over\n\nYour score is ` +
              PLAYER_SCORE +
              `\n\nDo you want to play again?`
          )
        )
          location.reload();
      }, EXPLOSE_MS * 2);
      return;
    }

    setTimeout(this.gameLoop, GAME_FRAME + this.pause_ms);
  };

  // LEVEL UP
  levelUp = level => {
    PLAYER_LEVEL = level;

    this.textR.update("Level " + PLAYER_LEVEL);
    this.txtLV.update("Level\n" + PLAYER_LEVEL);
    this.pause_ms = GAME_PAUSE_MS;

    // change bg music?

    addBackground(this.root, PLAYER_LEVEL);
  };

  // SHOOT
  shoot = () => {
    if (this.weapons.filter(w => !w.destroyed).length < MAX_WEAPONS)
      this.weapons.push(new Weapon(this.root, this.player, 1, PLAYER_LEVEL));
  };

  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.weapons = [];
    this.pause_ms = 0;

    // UI
    addBackground(this.root, PLAYER_LEVEL);
    this.textL = new Text(theRoot, 15, 10);
    this.textR = new Text(theRoot, GAME_WIDTH - 100, 10);
    this.txtLV = new Text(
      theRoot,
      0,
      50,
      "bold 200px Georgia",
      "gradient",
      true
    );

    // Q 3
    // setInterval(() => {
    //   if (MAX_ENEMIES > 9) return;

    //   MAX_ENEMIES++;
    //   GAME_WIDTH = ENEMY_WIDTH * MAX_ENEMIES;

    //   addBackground(this.root);
    // }, 1000);

    // window resize? https://www.w3schools.com/jsref/met_win_resizeto.asp
  }
}
