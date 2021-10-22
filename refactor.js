class View {

    #domElement = null;
    #isActive = false;

    constructor(domElement) {
        this.#domElement = domElement;
        this.#isActive = false;
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

    get domElement() {
        return this.#domElement;
    }

}

class LinkedListView extends View {

    #previousView = null;
    #nextView = null;

    constructor(domElement, previousView, nextView) {
        super(domElement);
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

class LinkedListContainer {
    
    #domElement = null;
    #views = {};
    #current = null;

    constructor(domElement) {
        this.#domElement = domElement;
        this.#detectViews();
    }

    #detectViews() {
        
        // Building views object with names
        this.#domElement.querySelectorAll(".view").forEach(viewDomElement => {
            let viewName = viewDomElement.getAttribute("data-view");
            this.#views[viewName] = new LinkedListView(viewDomElement);
        });
        
        // Building relationships between views
        Object.keys(this.#views).forEach(viewName => {
            const viewObject = this.#views[viewName];
            const previousViewName = viewObject.domElement.getAttribute("data-previous-view");
            const nextViewName = viewObject.domElement.getAttribute("data-next-view");
            viewObject.previous = this.#views[previousViewName];
            viewObject.next = this.#views[nextViewName];
        })

        // Activate first view
        const firstViewName = Object.keys(this.#views)[0];
        this.#current = this.#views[firstViewName];
        this.#current.activate();

    }

    next() {
        this.#current.deactivate();
        this.#current.next.activate();
        this.#current = this.#current.next;
    }

    previous() {
        this.#current.deactivate();
        this.#current.previous.activate();
        this.#current = this.#current.previous;
    }

}

const containerDomElement = document.querySelector(".view-container");
const linkedViewContainer = new LinkedListContainer(containerDomElement);
document.querySelector(".previous").addEventListener("click", () => linkedViewContainer.previous());
document.querySelector(".next").addEventListener("click", () => linkedViewContainer.next());
