let nextEnemySpot = enemies => {
  let enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  let spotsTaken = Array(GAME_WIDTH / ENEMY_WIDTH).fill(false);

  enemies.forEach(enemy => {
    spotsTaken[enemy.spot] = true;
  });

  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots);
  }
  return candidate;
};

let addBackground = (root, level) => {
  let bg = document.getElementById("background")
    ? document.getElementById("background")
    : document.createElement("img");

  if (level > GAME_MAX_LEVEL) level = GAME_MAX_LEVEL;

  bg.setAttribute("id", "background");
  bg.src = "images/back" + level + ".png";
  bg.style.height = GAME_HEIGHT + "px";
  bg.style.width = GAME_WIDTH + "px";
  root.append(bg);

  let whiteBox = document.createElement("div");
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = GAME_HEIGHT + "px";
  whiteBox.style.height = ENEMY_HEIGHT + "px";
  whiteBox.style.width = GAME_WIDTH + "px";
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};

let getElementPoint = element => {
  return {
    x1: parseInt(element.style.left),
    x2: parseInt(element.style.left) + parseInt(element.width),
    y1: parseInt(element.style.top),
    y2: parseInt(element.style.top) + parseInt(element.height)
  };
};

let hittest = (a, b, gap) => {
  let aX1 = parseInt(a.style.left);
  let aY1 = parseInt(a.style.top);
  let aX2 = aX1 + parseInt(a.width) - gap;
  let aY2 = aY1;
  let aX3 = aX1;
  let aY3 = aY1 + parseInt(a.height) - gap;
  let aX4 = aX2;
  let aY4 = aY3;

  let bX1 = parseInt(b.style.left);
  let bY1 = parseInt(b.style.top);
  let bX2 = bX1 + parseInt(b.width) - gap;
  let bY2 = bY1;
  let bX3 = bX1;
  let bY3 = bY1 + parseInt(b.height) - gap;
  let bX4 = bX2;
  let bY4 = bY3;

  let hOverlap = true;
  if (aX1 < bX1 && aX2 < bX1) hOverlap = false;
  if (aX1 > bX2 && aX2 > bX2) hOverlap = false;

  let vOverlap = true;
  if (aY1 < bY1 && aY3 < bY1) vOverlap = false;
  if (aY1 > bY3 && aY3 > bY3) vOverlap = false;

  if (hOverlap && vOverlap) return true;
  else return false;
};

let hittestWhatIdo = (p1, p2) => {
  if (
    !(
      p1.x1 > 0 &&
      p1.x2 > 0 &&
      p1.y1 > 0 &&
      p1.y2 > 0 &&
      p1.y1 > 0 &&
      p1.y2 > 0 &&
      p2.y1 > 0 &&
      p2.y2 > 0
    )
  )
    return false;

  if (p1.x1 > p2.x2 && p1.y1 > p2.y2) {
    console.log("1", p1.x1, p1.x2, p1.y1, p1.y2, p2.x1, p2.x2, p2.y1, p2.y2);
    return false;
  }
  if (p1.x2 < p2.x1 && p1.y1 > p2.y2) {
    console.log("2", p1.x1, p1.x2, p1.y1, p1.y2, p2.x1, p2.x2, p2.y1, p2.y2);
    return false;
  }
  if (p1.x1 > p2.x2 && p1.y2 < p2.y1) {
    console.log("3", p1.x1, p1.x2, p1.y1, p1.y2, p2.x1, p2.x2, p2.y1, p2.y2);
    return false;
  }
  if (p1.x2 < p2.x1 && p1.y2 < p2.y1) {
    console.log("4", p1.x1, p1.x2, p1.y1, p1.y2, p2.x1, p2.x2, p2.y1, p2.y2);
    return false;
  }

  console.log("5", p1.x1, p1.x2, p1.y1, p1.y2, p2.x1, p2.x2, p2.y1, p2.y2);

  return true;
};
