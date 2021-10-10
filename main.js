class ViewContainer {

    #container = null;
    #views = null;
    #currentActivatedView = null;

    #settings = {
        selectors: {
            CONTAINER_SELECTOR: ".view-container",
            VIEW_SELECTOR: ".view[data-view-name]",
            LINK_SELECTOR: "[data-view-link-to]",
            LINK_ATTRIBUTE_NAME: "data-view-link-to",
            DEFAULT_VIEW_ATTRIBUTE_NAME: "data-default-activated-view"
        },
        transitionSettings: {
            DELAYED_TRANSITION: true,
            VARIABLE_HEIGHT_CONTAINER: false
        }
    }

    #util = {
        getNextViewFromLink: link => {
            const name = link.getAttribute(this.#settings.selectors.LINK_ATTRIBUTE_NAME);
            const selector = `${this.#settings.selectors.VIEW_SELECTOR.slice(0, -1)}='${name}']`;
            return this.#container.querySelector(selector);
        },
        getNextViewByName: viewName => {
            const selector = `${this.#settings.selectors.VIEW_SELECTOR.slice(0, -1)}='${viewName}']`;
            return this.#container.querySelector(selector);
        }
    }

    constructor(container) {
        this.#container = container;
        this.#views = this.#container.querySelectorAll(this.#settings.selectors.VIEW_SELECTOR);
        this.#configure();
    }

    #configure() {
        this.#views.forEach(view => {
            this.#setupAnimationStart(view);
            this.#setupAnimationEnd(view);
            this.#setupLinks(view);
            !this.#currentActivatedView && view.hasAttribute(this.#settings.selectors.DEFAULT_VIEW_ATTRIBUTE_NAME) ? this.activateView(view) : null;
            this.#settings.transitionSettings.VARIABLE_HEIGHT_CONTAINER ? this.#setupContainerHeight() : null;
        });
    }

    #setupContainerHeight() {
        this.#container.style.height = `${this.#currentActivatedView.offsetHeight}px`;
        this.#container.addEventListener("viewChange", event => 
            event.target.style.height = `${event.detail.newActiveView.offsetHeight}px`
        )
    }

    #setupAnimationStart(view) {
        view.addEventListener("animationstart", () =>
            view.classList.contains("active") ? view.classList.add("visible") : null
        );
    }

    #setupAnimationEnd(view) {
        view.addEventListener("animationend", () => {
            !view.classList.contains("active") ? view.classList.remove("visible") : null
            if (this.#settings.transitionSettings.DELAYED_TRANSITION)
                this.#currentActivatedView.classList.add("active");
        })
    }

    #setupLinks(view) {
        view.querySelectorAll(this.#settings.selectors.LINK_SELECTOR).forEach(link =>
            link.addEventListener("click", () => 
                this.activateNextViewFromLink(link)
            )
        )
    }

    activateNextViewFromLink(link) {
        const nextView = this.#util.getNextViewFromLink(link);
        this.activateView(nextView);
    }

    activateView(view) {
        const viewChangeEvent = new CustomEvent("viewChange", { detail: { lastActiveView: this.#currentActivatedView, newActiveView: view }});

        if (this.#currentActivatedView && this.#currentActivatedView != view)
            this.#currentActivatedView.classList.remove("active");
        this.#currentActivatedView = view;
        if (!this.#settings.transitionSettings.DELAYED_TRANSITION)
            view.classList.add("active");
        this.#container.dispatchEvent(viewChangeEvent);
    }

    activateViewByName(viewName) {
        const view = this.#util.getNextViewByName(viewName);
        this.activateView(view);
    }

    getActiveView() {
        return this.#currentActivatedView;
    }

    getContainer() {
        return this.#container;
    }

}

const container = new ViewContainer(document.querySelector(".view-container"));
