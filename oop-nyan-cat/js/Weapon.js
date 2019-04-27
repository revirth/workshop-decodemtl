class Weapon {
  update(timeDiff) {
    if (this.destroyed) this.root.removeChild(this.domElement);

    this.y = this.y - timeDiff * this.speed;
    this.domElement.style.top = this.y;

    if (this.y < 0) {
      try {
        this.root.removeChild(this.domElement);
        this.destroyed = true;
      } catch (error) {}
    }
  }
  constructor(root, thePlayer, speed, level) {
    this.root = root;
    this.x = thePlayer.x;
    this.y = thePlayer.y - 10;
    this.domElement = document.createElement("img");

    if (level > GAME_MAX_LEVEL) level = GAME_MAX_LEVEL;

    new Audio("./mp3/weapon" + level + ".mp3").play();

    // SND_WEAPHON[level].pause();
    // SND_WEAPHON[level].play();

    this.power = level * 2 + 1;
    this.speed = speed;
    this.domElement.src = "images/weapon" + level + ".gif";
    // this.domElement.src = "images/weapon1.gif";
    this.domElement.width = 75;
    this.domElement.height = 75;

    if (DEBUG_MODE) this.domElement.style.border = "1px solid yello";

    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x;
    this.domElement.style.top = this.y;
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
  }

  explose() {
    // this.domElement.src = "images/explosion2.gif";
    this.destroyed = true;
    // setTimeout(() => {
    //   this.root.removeChild(this.domElement);
    // }, 400);
  }
}
