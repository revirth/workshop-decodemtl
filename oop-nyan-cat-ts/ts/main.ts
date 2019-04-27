let root = document.getElementById("game");

root.style.border = "1px solid black";
root.style.width = GAME_WIDTH + "px";
root.style.height = GAME_HEIGHT + "px";

let engine = new Engine(root);
engine.gameloop();

document.addEventListener("keydown", event => {
  consoleD("TCL: event", event);

  if (PLAYER_ALIVE() && event.code === "ArrowLeft")
    engine.player.move(PLAYER_MOVE.LEFT);

  if (PLAYER_ALIVE() && event.code === "ArrowRight")
    engine.player.move(PLAYER_MOVE.RIGHT);

  if (PLAYER_ALIVE() && event.code === "ArrowUp")
    engine.player.move(PLAYER_MOVE.UP);

  if (PLAYER_ALIVE() && event.code === "ArrowDown")
    engine.player.move(PLAYER_MOVE.DOWN);

  if (PLAYER_ALIVE() && event.code === "Space") engine.shoot();

  if (event.code === "Escape") {
    GAME_PAUSE = !GAME_PAUSE;

    if (!GAME_PAUSE) engine.gameloop();
  }
});
