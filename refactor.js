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
            if (!this.#isActive) 
                this.#domElement.classList.remove("visible");
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

class LinkedListView extends View {

    #previousView = null;
    #nextView = null;

    constructor(domElement, previousView, nextView, activeByDefault = false) {
        super(domElement, activeByDefault);
        this.#previousView = previousView;
        this.#nextView = nextView;
    }

    get previous() {
        return this.#previousView;
    }

    set previous(previousView) {
        this.#previousView = previousView;
    }

    get next() {
        return this.#nextView;
    }

    set next(nextView) {
        this.#nextView = nextView;
    }

}

const firstDomElement = document.querySelector(".view[data-view-name='one']");
const secondDomElement = document.querySelector(".view[data-view-name='two']");
const thirdDomElement = document.querySelector(".view[data-view-name='three']");
const fourthDomElement = document.querySelector(".view[data-view-name='four']");

console.log(firstDomElement, secondDomElement, thirdDomElement, fourthDomElement);
const firstView = new LinkedListView(firstDomElement);
const secondView = new LinkedListView(secondDomElement);
const thirdView = new LinkedListView(thirdDomElement);
const fourthView = new LinkedListView(fourthDomElement);

firstView.previous = fourthView;
secondView.previous = firstView;
thirdView.previous = secondView;
fourthView.previous = thirdView;
firstView.next = secondView;
secondView.next = thirdView;
thirdView.next = fourthView;
fourthView.next = firstView;

let currentView = firstView;
currentView.activate();

document.querySelector(".previous").addEventListener("click", () => {
    currentView.deactivate();
    currentView.previous.activate();
    currentView = currentView.previous;
})

document.querySelector(".next").addEventListener("click", () => {
    currentView.deactivate();
    currentView.next.activate();
    currentView = currentView.next;
})