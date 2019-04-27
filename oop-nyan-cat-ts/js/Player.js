class Player extends GameObject {
    constructor(root) {
        super();
        this.move = (dir) => {
            switch (dir) {
                case PLAYER_MOVE.LEFT:
                    if (this.x > 0)
                        this.x -= PLAYER_WIDTH;
                    this.domElement.setAttribute("class", "playerL");
                    break;
                case PLAYER_MOVE.RIGHT:
                    if (this.x < GAME_WIDTH - PLAYER_WIDTH)
                        this.x += PLAYER_WIDTH;
                    this.domElement.setAttribute("class", "playerR");
                    break;
                case PLAYER_MOVE.UP:
                    if (this.y > 0)
                        this.y -= PLAYER_HEIGHT;
                    break;
                case PLAYER_MOVE.DOWN:
                    if (this.y < GAME_HEIGHT - PLAYER_HEIGHT)
                        this.y += PLAYER_HEIGHT;
                    break;
            }
            this.update();
        };
        this.update = () => {
            this.domElement.style.left = this.x + "px";
            this.domElement.style.top = this.y + "px";
        };
        this.explose = () => {
            this.audio.play();
            this.domElement.src = "images/explosion1.gif";
            setTimeout(() => {
                try {
                    this.root.removeChild(this.domElement);
                }
                catch (error) { }
            }, EXPLOSE_MS);
        };
        this.root = root;
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT;
        this.domElement = document.createElement("img");
        this.domElement.src = "images/player_yoshi.gif";
        this.domElement.style.width = "75px";
        this.domElement.style.height = "75px";
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
        this.domElement.style.zIndex = PLAYER_ZINDEX.toString();
        if (DEBUG_MODE)
            this.domElement.style.border = "1px solid green";
        this.root.append(this.domElement);
        this.audio = new Audio("mp3/explosion1.mp3");
    }
}
