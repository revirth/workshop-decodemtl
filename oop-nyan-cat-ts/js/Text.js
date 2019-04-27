class GameText extends GameObject {
    // root: HTMLElement;
    // domElement: HTMLDivElement;
    constructor(root, x, y) {
        super();
        this.update = text => {
            this.domElement.innerText = text;
        };
        this.root = root;
        this.domElement = document.createElement("div");
        this.domElement.style.position = "absolute";
        this.domElement.style.left = x + "px";
        this.domElement.style.top = y + "px";
        this.domElement.style.zIndex = TEXT_ZINDEX + "px";
        this.root.append(this.domElement);
    }
}
