class Text {
  constructor(root, xPos, yPos, font, className, center) {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = "white";
    div.style.font = font ? font : "30px Impact";
    div.style.zIndex = 2000;
    div.setAttribute("class", className);

    if (center) {
      div.style.left = 0;
      if (DEBUG_MODE) div.style.border = "1px solid white";
      div.style.width = GAME_WIDTH;
      div.style.alignContent = "center";
    }

    root.appendChild(div);
    this.domElement = div;
  }
  update(txt) {
    this.domElement.innerText = txt;
  }
}
