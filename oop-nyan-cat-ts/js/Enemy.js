class Enemy extends GameObject {
    constructor(root, spot, speed, mvLeft) {
        super();
        // domElement: HTMLImageElement;
        // x: number;
        // y: number;
        this.destroyed = false;
        this.update = timeDiff => {
            if (ENEMY_DIAGONAL) {
                var angle = 80;
                var angleRad = angle * (Math.PI / 180);
                this.x = this.mvLeft
                    ? this.x + timeDiff * this.speed * Math.cos(angleRad)
                    : this.x - timeDiff * this.speed * Math.cos(angleRad);
                this.y = this.y + timeDiff * this.speed * Math.sin(angleRad);
                this.domElement.style.left = this.x + "px";
                this.domElement.style.top = this.y + "px";
            }
            else {
                this.y = this.y + timeDiff * this.speed;
            }
            if (this.y > GAME_HEIGHT) {
                this.destroyed = true;
                this.root.removeChild(this.domElement);
                return;
            }
            this.domElement.style.top = this.y + "px";
        };
        this.explose = () => {
            this.audio.play();
            this.domElement.src = "images/explosion2.gif";
            this.destroyed = true;
            setTimeout(() => {
                try {
                    this.root.removeChild(this.domElement);
                }
                catch (error) { }
            }, EXPLOSE_MS);
        };
        this.root = root;
        this.spot = spot;
        this.speed = speed;
        this.mvLeft = mvLeft;
        this.x = this.spot * ENEMY_WIDTH;
        this.y = ENEMY_HEIGHT * -1;
        this.domElement = document.createElement("img");
        this.domElement.src = `images/enemy${PLAYER_LEVEL}.gif`;
        this.domElement.style.width = `${75 +
            (75 * PLAYER_LEVEL) / GAME_OVER_LEVEL}px`;
        this.domElement.style.height = `${75 +
            (75 * PLAYER_LEVEL) / GAME_OVER_LEVEL}px`;
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
        this.domElement.style.zIndex = ENEMY_ZINDEX.toString();
        if (DEBUG_MODE)
            this.domElement.style.border = "1px solid red";
        this.root.append(this.domElement);
        this.audio = new Audio("mp3/explosion0.mp3");
    }
}
