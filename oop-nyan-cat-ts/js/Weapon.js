class Weapon extends GameObject {
    constructor(root, player, speed) {
        super();
        // domElement: HTMLImageElement;
        // x: number;
        // y: number;
        this.destroyed = false;
        this.update = timeDiff => {
            if (this.destroyed)
                this.root.removeChild(this.domElement);
            this.y = this.y - timeDiff * this.speed;
            this.domElement.style.top = this.y + "px";
            if (this.y < 0) {
                try {
                    this.root.removeChild(this.domElement);
                    this.destroyed = true;
                }
                catch (error) { }
            }
        };
        this.root = root;
        this.speed = speed;
        this.x = parseInt(player.domElement.style.left);
        this.y = parseInt(player.domElement.style.top) - 20;
        this.domElement = document.createElement("img");
        this.domElement.src = `images/weapon${PLAYER_LEVEL}.gif`;
        this.domElement.style.width = "75px";
        this.domElement.style.height = "75px";
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
        this.domElement.style.zIndex = WEAPON_ZINDEX.toString();
        if (DEBUG_MODE)
            this.domElement.style.border = "1px solid blue";
        this.root.append(this.domElement);
        this.audio = new Audio(`mp3/weapon${PLAYER_LEVEL}.mp3`);
        this.audio.play();
    }
}
