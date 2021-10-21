class View {

    #domElement = null;
    #isActive = false;
    #hideEvent = new CustomEvent("hide");

    constructor(domElement, activeByDefault = false) {
        this.#domElement = domElement;
        this.#isActive = activeByDefault;
        this.#setupAnimationStart();
        this.#setupAnimationEnd();
    }

    #setupAnimationStart() {
        this.#domElement.addEventListener("animationstart", () => {
            if (!this.#isActive) this.#domElement.classList.add("visible");
        })
    }

    #setupAnimationEnd() {
        this.#domElement.addEventListener("animationend", () => {
            if (this.#isActive) this.#domElement.classList.remove("visible");
            this.#isActive = !this.#isActive;
        })
    }

    activate() {
        this.#domElement.classList.add("active");
    }

    deactivate() {
        this.#domElement.classList.remove("active");
    }

    get isActive() {
        return this.#isActive;
    }

}

const domElement = document.querySelector(".view");
const view = new View(domElement);
view.activate()
document.querySelector(".testbtn").addEventListener("click", () => {
    if (view.isActive) {
        view.deactivate()
    } else {
        view.activate();
    }
})