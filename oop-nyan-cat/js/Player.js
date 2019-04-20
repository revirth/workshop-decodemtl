class Player {
  constructor(root) {
    this.root = root;
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.domElement = document.createElement("img");

    // this.domElement.src = "images/player.png";
    this.domElement.src = "images/player_yoshi.gif";
    this.domElement.width = 75;
    this.domElement.height = 75;

    if (DEBUG_MODE) this.domElement.style.border = "1px solid green";

    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x;
    this.domElement.style.top = this.y;
    this.domElement.style.zIndex = 10;
    this.domElement.setAttribute("class", "playerL");

    this.weapons = [];

    this.root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.setAttribute("class", "playerL");
    this.domElement.style.left = this.x;
  }
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.setAttribute("class", "playerR");
    this.domElement.style.left = this.x;
  }
  moveUp() {
    if (this.y > PLAYER_HEIGHT) {
      this.y = this.y - PLAYER_HEIGHT;
    }
    this.domElement.style.top = this.y;
  }
  moveDown() {
    if (this.y + PLAYER_HEIGHT * 2 < GAME_HEIGHT) {
      this.y += PLAYER_HEIGHT;
    }
    this.domElement.style.top = this.y;
  }

  explose() {
    this.domElement.src = "images/explosion1.gif";

    new Audio("./mp3/explosion1.mp3").play();
    // SND_EXPLOSE[1].pause();
    // SND_EXPLOSE[1].play();

    setTimeout(() => {
      this.root.removeChild(this.domElement);
    }, EXPLOSE_MS);
  }
}
