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

class h2 {
    constructor(text) {
        this.text = text;
    }
    render() {
        var ret = document.createElement("h2");
        ret.innerText = this.text;
        return ret;
    }
}

class h3 {
    constructor(text) {
        this.text = text;
    }
    render() {
        var ret = document.createElement("h3");
        ret.innerText = this.text;
        return ret;
    }
}


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


function populate(DOMElement, e) {
    DOMElement.innerHTML = '';
    DOMElement.appendChild(e.render());
}

populate(document.getElementById('root'),
    new div([
        new h1("I love javascript"),
        new h2("so much"),
        new h3("I'm not kidding")]))