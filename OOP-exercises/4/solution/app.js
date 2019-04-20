
function populate(DOMElement, e) {
    DOMElement.innerHTML = '';
    DOMElement.appendChild(e.render());
}

//IGNORE EVERYTHING ABOVE THIS LINE

class div {
    constructor(children) {
        this.children = children;
    }
    render() {
        var ret = document.createElement("div");
        for (var i = 0; i < this.children.length; i++) {
            ret.appendChild(this.children[i].render());
        }
        return ret;
    }
}

class h1 {
    constructor(text) {
        this.text = text;
    }
    render() {
        var ret = document.createElement("h1");
        ret.innerText = this.text;
        return ret;
    }
}

class ul {
    constructor(children) {
        this.children = children;
    }
    render() {
        var ret = document.createElement("ul");
        for (var i = 0; i < this.children.length; i++) {
            ret.appendChild(this.children[i].render());
        }
        return ret;
    }
}


class li {
    constructor(text) {
        this.text = text;
    }
    render() {
        var ret = document.createElement("li");
        ret.innerText = this.text;
        return ret;
    }
}


populate(document.getElementById('root'),
    new ul([
        new li("I love cheese"),
        new li("I love bacon"),
        new li("I love croissants")]))