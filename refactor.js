class View {

    #domElement = null;
    #isActive = false;

    constructor(domElement, activeByDefault = false) {
        this.#domElement = domElement;
        this.#isActive = activeByDefault;
        this.#setupAnimationStart();
        this.#setupAnimationEnd();
    }

    #setupAnimationStart() {
        if (this.isActive) return;
        console.log("animationstart?")
        this.#domElement.addEventListener("animationstart", () => {
            this.#domElement.classList.add("visible");
        })
    }

    #setupAnimationEnd() {
        if (!this.isActive) return;
        console.log("animationend?")
        this.#domElement.addEventListener("animationend", () => {
            this.#domElement.classList.remove("active");
        })
    }

    get isActive() {
        return this.#isActive;
    }

    set isActive(activationState) {
        // Make checks for boolean values
        this.#isActive = activationState;
    }

    activate() {
        this.isActive = true;
        this.#domElement.classList.add("active");
    }

    deactivate() {
        this.isActive = false;
        this.#domElement.classList.remove("active");
    }

}

const domElement = document.querySelector(".view");
const view = new View(domElement);
view.activate();
document.querySelector(".testbtn").addEventListener("click", () => {
    if (view.isActive)
        view.deactivate()
    else
        view.activate();
})