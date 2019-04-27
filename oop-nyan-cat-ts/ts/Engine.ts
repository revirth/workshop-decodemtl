class Engine {
  root: HTMLElement;
  player: Player;
  enemies: Enemy[];
  weapons: Weapon[];
  lastFrame: number;
  txtScore: GameText;
  txtLevel: GameText;
  lastWeaponFrame: number;

  constructor(root: HTMLElement) {
    this.root = root;
    this.player = new Player(root);
    this.enemies = [];
    this.weapons = [];
    this.lastFrame = new Date().getTime();
    this.txtScore = new GameText(root, 10, 10);
    this.txtLevel = new GameText(root, GAME_WIDTH - 100, 10);
    this.lastWeaponFrame = new Date().getTime();
  }

  hitTest = (a: HTMLImageElement, b: HTMLImageElement, gap: number) => {
    let ax1 = parseInt(a.style.left);
    let ay1 = parseInt(a.style.top);
    let ax2 = ax1 + a.width - gap;
    let ay2 = ay1 + a.height - gap;

    let bx1 = parseInt(b.style.left);
    let by1 = parseInt(b.style.top);
    let bx2 = bx1 + b.width - gap;
    let by2 = by1 + b.height - gap;

    consoleD(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);

    let hOverlap = true;
    if (ax1 < bx1 && ax2 < bx1) hOverlap = false; // A B
    if (ax1 > bx2 && ax2 > bx2) hOverlap = false; // B A

    let vOverlap = true;
    if (ay1 < by1 && ay2 < by1) vOverlap = false; // A\nB
    if (ay1 > by2 && ay2 > by2) vOverlap = false; // B\nA

    return hOverlap && vOverlap;
  };
  nextEnemySpot = (enemies: Enemy[]) => {
    let enemySpots = GAME_WIDTH / ENEMY_WIDTH;
    let spotsTaken = Array(enemySpots).fill(false);

    enemies.forEach(enemy => {
      spotsTaken[enemy.spot] = true;
    });

    let candidate = undefined;

    while (candidate === undefined || spotsTaken[candidate])
      candidate = Math.floor(Math.random() * enemySpots);

    return candidate;
  };

  gameloop = () => {
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    consoleD("TCL: Engine -> gameloop", timeDiff);

    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);

      // COLLISION enemy, weapon
      this.weapons.forEach(weapon => {
        if (this.hitTest(enemy.domElement, weapon.domElement, 5)) {
          weapon.destroyed = true; // 맞는 즉시 상태값 변경

          enemy.explose();
        }
      });

      // COLLISION enemy, player
      if (this.hitTest(enemy.domElement, this.player.domElement, 35)) {
        enemy.explose();
        PLAYER_LIFE--;

        consoleD(
          "TCL: Engine -> gameloop -> hitTest",
          enemy.spot,
          "life :",
          PLAYER_LIFE
        );
      }
    });

    this.enemies = this.enemies.filter(enemy => !enemy.destroyed);

    while (this.enemies.length < ENEMY_NUMBER)
      this.enemies.push(
        new Enemy(
          this.root,
          this.nextEnemySpot(this.enemies),
          0.05 + Math.random() * 0.1,
          Math.random() >= 0.5 // move left or right?
        )
      );

    consoleD(
      "TCL: Engine -> gameloop -> Speed",
      (Math.random() + 0.3) / (ENEMY_NUMBER - PLAYER_LEVEL)
    );

    //#region SCORE
    PLAYER_SCORE += PLAYER_SCORE_POINT;

    if (PLAYER_SCORE % LEVELUP_POINT === 0) {
      consoleD("TCL: Engine -> gameloop -> PLAYER_SCORE", PLAYER_SCORE);

      PLAYER_LEVEL++;
      this.txtLevel.update(`LEVEL ${PLAYER_LEVEL}`);

      if (PLAYER_LEVEL >= GAME_OVER_LEVEL) {
        alert(`GAME FINISHED!!!\n\nThanks for playing :)`);
        return;
      }
    }

    this.txtScore.update(`SCORE ${PLAYER_SCORE}`);

    //#endregion

    //#region WEAPON

    this.weapons.forEach(weapon => weapon.update(timeDiff));

    this.weapons = this.weapons.filter(weapon => !weapon.destroyed);

    //#endregion

    if (!PLAYER_ALIVE()) {
      this.player.explose();
      console.log("GAME OVER");
      return;
    } else if (GAME_PAUSE) {
      console.log("TCL: Engine -> gameloop -> GAME_PAUSE", GAME_PAUSE);
    } else {
      setTimeout(this.gameloop, GAME_FRAME);
    }
  };

  shoot = () => {
    // if (this.weapons.length < WEAPON_NUMBER)
    if (this.weapons.length <= PLAYER_LEVEL)
      this.weapons.push(new Weapon(this.root, this.player, 1));

    // let timeDiff = new Date().getTime() - this.lastWeaponFrame;
    // this.lastWeaponFrame = new Date().getTime();

    // if (DEBUG_MODE) console.log("TCL: Engine -> shoot -> timeDiff", timeDiff);

    // if (timeDiff >= 200)
    //   this.weapons.push(
    //     new Weapon(this.root, this.player, (WEAPON_NUMBER - PLAYER_LEVEL) / 50)
    //   );
    // this.weapons.length < WEAPON_NUMBER)
  };
}
