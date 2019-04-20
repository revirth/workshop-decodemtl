let ENEMY_WIDTH = 75;
let ENEMY_HEIGHT = 156;
let MAX_ENEMIES = 10;
let ENEMY_DIAGONAL = true;
let EXPLOSE_MS = 300;

let GAME_WIDTH = ENEMY_WIDTH * MAX_ENEMIES;
let GAME_HEIGHT = window.innerHeight - 200;
let GAME_MAX_LEVEL = 4;
let GAME_PAUSE_MS = 2000;

let PLAYER_WIDTH = 75;
let PLAYER_HEIGHT = 54;
let PLAYER_SCORE = 0;
let PLAYER_DEAD = false;
let PLAYER_LEVEL = 0;
let LEVELUP_PER_SCORE = 3000;

let DEBUG_MODE = false;
let SHOOT_MODE = true;
let GAME_FRAME = DEBUG_MODE ? 300 : 20;

let MAX_WEAPONS = 5;

let SND_WEAPHON = [
  document.getElementById("weaphon0"),
  document.getElementById("weaphon1"),
  document.getElementById("weaphon2"),
  document.getElementById("weaphon3"),
  document.getElementById("weaphon4")
];

let SND_EXPLOSE = [
  document.getElementById("weaphon0"),
  document.getElementById("weaphon1")
];
