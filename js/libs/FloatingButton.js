import { throttle } from "throttle-debounce";
const buttonSizeInit = Math.max(window.innerWidth, window.innerHeight) > 768 ? 80 : 50;
export default class FloatingButton {
    constructor() {
        this.config = {
            size: buttonSizeInit,
            margin: buttonSizeInit * 1.3,
            inactiveOpacity: 0.5,
            activeOpacity: 0.95,
        };
        this.clickedId = null;
        this.dragCount = 0;
        this.isActive = false;
    }
    static getOffset(offset, margin) {
        return offset - margin + "px";
    }
    init(elementId) {
        this.dom = this.constructElement(elementId);
        this.applyStyle({
            width: this.config.size + "px",
            height: this.config.size + "px",
            borderRadius: this.config.size + "px",
            position: "absolute",
            top: FloatingButton.getOffset(document.body.clientHeight, this.config.margin),
            left: FloatingButton.getOffset(document.body.clientWidth, this.config.margin),
            opacity: this.config.inactiveOpacity.toString()
        });
        // Apply eventListener
        this.dom.addEventListener("pointerdown", this.buttonClicked);
        this.dom.addEventListener("pointerup", this.buttonUnclicked);
        document.body.addEventListener("pointermove", this.buttonDragged);
        window.addEventListener("resize", throttle(50, this.buttonRepositioned));
    }
    constructElement(elementId) {
        var element = document.createElement("div");
        document.body.appendChild(element);
        element.setAttribute("id", elementId || "floatingButton");
        element.setAttribute("touch-action", "none");
        return element;
    }
    applyStyle(cssStyle) {
        const self = this;
        Object.keys(cssStyle).map((key) => {
            self.dom.style[key] = cssStyle[key];
        });
    }
    buttonClicked(event) {
        this.clickedId = event.pointerId;
        this.isActive = true;
        this.dom.style.opacity = this.config.activeOpacity.toString();
    }
    buttonUnclicked() {
        if (this.clickedId && this.dragCount < 3) {
            if (this.onClick)
                this.onClick();
        }
        this.clickedId = null;
        this.dragCount = 0;
        this.isActive = false;
        const self = this;
        setTimeout(function () {
            if (!self.isActive)
                self.dom.style.opacity = self.config.inactiveOpacity.toString();
        }, 1000);
    }
    buttonDragged(event) {
        if (this.clickedId && this.clickedId === event.pointerId) {
            this.isActive = true;
            this.dragCount += 1;
            this.dom.style.top = event.pageY - this.config.size / 2 + "px";
            this.dom.style.left = event.pageX - this.config.size / 2 + "px";
        }
    }
    buttonRepositioned() {
        if (parseInt(this.dom.style.top) + this.config.margin > window.innerHeight) {
            this.dom.style.top = FloatingButton.getOffset(document.body.clientHeight, this.config.margin);
        }
        if (parseInt(this.dom.style.left) + this.config.margin > window.innerWidth) {
            this.dom.style.left = FloatingButton.getOffset(document.body.clientWidth, this.config.margin);
        }
    }
}
//# sourceMappingURL=FloatingButton.js.map