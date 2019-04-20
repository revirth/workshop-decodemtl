let gameEngine = new Engine(document.getElementById("app"));

let keydownHandler = event => {
  event.stopPropagation();
  if (PLAYER_DEAD && DEBUG_MODE === false) return;

  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "ArrowUp") {
    gameEngine.player.moveUp();
  }
  if (event.code === "ArrowDown") {
    gameEngine.player.moveDown();
  }

  if (SHOOT_MODE && event.code === "Space") {
    gameEngine.shoot();
  }
};
document.addEventListener("keydown", keydownHandler);

gameEngine.gameLoop();
