class View {

    #domElement = null;
    #isActive = false;

    constructor(domElement, activeByDefault = false) {
        this.#domElement = domElement;
        this.#isActive = activeByDefault;
        this.#setupAnimationEnd();
    }

    #setupAnimationEnd() {
        this.#domElement.addEventListener("animationend", () => {
            !this.#isActive ? this.#domElement.classList.remove("visible") : null;
        })
    }

    activate() {
        this.#isActive = true;
        this.#domElement.classList.add("visible");
        this.#domElement.classList.add("active");
    }

    deactivate() {
        this.#isActive = false;
        this.#domElement.classList.remove("active");
    }

    get isActive() {
        return this.#isActive;
    }

}

const domElement = document.querySelector(".view[data-view-name='one']");
const domElement2 = document.querySelector(".view[data-view-name='two']");
const view = new View(domElement);
const view2 = new View(domElement2);
view.activate();
document.querySelector(".testbtn").addEventListener("click", () => {
    if (view.isActive) {
        view.deactivate();
        view2.activate();
    } else {
        view2.deactivate();
        view.activate();
    }
})